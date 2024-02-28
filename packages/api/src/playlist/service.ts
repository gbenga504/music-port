import { nanoid } from "nanoid";

import * as validator from "./validator";

import { InvalidExportIdError } from "../errors/invalid-export-id-error";
import * as thirdPartyIntegrations from "../third-party-integrations";

import type { PlaylistRepository } from "./repository";
import type { AdminAuthTokenService } from "../admin-auth-token/service";
import type { ConversionService } from "../conversion/service";
import type { IPlaylist, IPlaylistGenre, IRawPlaylist } from "../models";
import type { DocumentId } from "../models/helper";
import type { PlaylistGenreRepository } from "../playlist-genre/repository";
import type { PlatformType } from "../utils/platform";

interface IConstructorOptions {
  playlistRepository: PlaylistRepository;
  playlistGenreRepository: PlaylistGenreRepository;
  adminAuthTokenService: AdminAuthTokenService;
  conversionService: ConversionService;
}

export class PlaylistService {
  private playlistRepository: PlaylistRepository;
  private adminAuthTokenService: AdminAuthTokenService;
  private conversionService: ConversionService;
  private playlistGenreRepository: PlaylistGenreRepository;

  constructor({
    playlistRepository,
    adminAuthTokenService,
    conversionService,
    playlistGenreRepository,
  }: IConstructorOptions) {
    this.playlistRepository = playlistRepository;
    this.adminAuthTokenService = adminAuthTokenService;
    this.conversionService = conversionService;
    this.playlistGenreRepository = playlistGenreRepository;
  }

  async convertPlaylistUsingAdminAuthToken({
    inputs,
    userAccessToken,
    userId,
  }: {
    inputs: {
      fromPlatform: PlatformType;
      toPlatform: PlatformType;
      link: string;
    };
    userAccessToken: string;
    userId: string;
  }): Promise<{ url: string }> {
    const { fromPlatform, link, toPlatform } =
      validator.convertPlaylistUsingAdminAuthToken(inputs);

    const adminAccessToken =
      await this.adminAuthTokenService.getTokenByPlatform({
        platform: fromPlatform,
      });

    const rawPlaylist = await this.importPlaylist({
      accessToken: adminAccessToken.token,
      link,
    });

    return this.exportPlaylist({
      accessToken: userAccessToken,
      userId,
      platform: toPlatform,
      playlist: rawPlaylist,
    });
  }

  async convertPlaylist({
    inputs,
    accessToken,
    userId,
  }: {
    inputs: {
      platform: string;
      playlistExportId: string;
    };
    accessToken: string;
    userId: string;
  }): Promise<{ url: string }> {
    const { platform, playlistExportId } = validator.convertPlaylist(inputs);

    const playlist = await this.playlistRepository.findOneByExportId(
      playlistExportId,
    );

    if (!playlist) {
      throw new InvalidExportIdError({
        message: "Export Id not found",
      });
    }

    return this.exportPlaylist({
      accessToken,
      userId,
      platform,
      playlist,
    });
  }

  async createPlaylist({
    inputs,
    accessToken,
  }: {
    inputs: {
      author: string;
      playlistLink: string;
      playlistName?: string | null;
      playlistGenreId: string;
      platform: string;
    };
    accessToken: string;
  }): Promise<IPlaylist> {
    const validInputs = validator.createPlaylist(inputs);

    // We don't want to send a request to the music streaming service neither
    // do we want to save a playlist more than once. So we check if the import link
    // already exists in our DB and we return early
    const playlistId =
      thirdPartyIntegrations.getPlaylistIdUsingPlaylistLinkOrThrow(
        validInputs.platform,
        validInputs.playlistLink,
      );

    const existingPlaylist =
      await this.playlistRepository.findOneByImportPlaylistId(playlistId);

    if (existingPlaylist) {
      return existingPlaylist;
    }

    const rawPlaylist = await this.importPlaylist({
      accessToken,
      link: validInputs.playlistLink,
    });

    const playlist = {
      ...rawPlaylist,
      exportId: this.generateExportId(),
      genre: validInputs.playlistGenreId,
      name: validInputs.playlistName ?? rawPlaylist.name,
      owner: {
        ...rawPlaylist.owner,
        name: validInputs.author ?? rawPlaylist.owner.name,
      },
    };

    return this.playlistRepository.create(playlist);
  }

  async getById({
    id,
  }: {
    id: DocumentId | string;
  }): Promise<IPlaylist | null> {
    return this.playlistRepository.findById(id);
  }

  async getByExportId({
    exportId,
  }: {
    exportId: string;
  }): Promise<IPlaylist | null> {
    return this.playlistRepository.findOneByExportId(exportId);
  }

  async getPlaylists({
    query,
    currentPage,
    pageSize,
  }: {
    query: { genre?: DocumentId | string | null };
    currentPage: number;
    pageSize: number;
  }): Promise<ReturnType<PlaylistRepository["findManyPlaylist"]>> {
    return this.playlistRepository.findManyPlaylist(
      query,
      currentPage,
      pageSize,
    );
  }

  async getPlaylistSongs({
    playlistId,
    currentPage,
    pageSize,
  }: {
    playlistId: string;
    currentPage: number;
    pageSize: number;
  }): Promise<ReturnType<PlaylistRepository["findManyPlaylistSongs"]>> {
    return this.playlistRepository.findManyPlaylistSongs(
      playlistId,
      currentPage,
      pageSize,
    );
  }

  async getFeaturedPlaylists(): Promise<
    ReturnType<PlaylistRepository["groupPlaylistsByGenre"]>
  > {
    return this.playlistRepository.groupPlaylistsByGenre({ limit: 10 });
  }

  async deletePlaylist(
    id: string | DocumentId,
  ): Promise<ReturnType<PlaylistRepository["deleteById"]>> {
    return this.playlistRepository.deleteById(id);
  }

  async getPlaylistsByGenre({
    genreId,
    pageSize,
  }: {
    genreId: string;
    pageSize?: number;
  }): Promise<{ genre: IPlaylistGenre; items: IPlaylist[] }> {
    const result = await this.playlistRepository.findManyPlaylist(
      { genre: genreId },
      1,
      pageSize ?? 55,
    );

    const genre = await this.playlistGenreRepository.findByIdOrThrow(genreId);

    return {
      genre,
      items: result.data,
    };
  }

  private async importPlaylist({
    accessToken,
    link,
  }: {
    accessToken: string;
    link: string;
  }): Promise<IRawPlaylist> {
    const platform = thirdPartyIntegrations.getPlatformName(link);

    const rawPlaylist = await thirdPartyIntegrations.getPlaylistByLink(
      platform,
      {
        accessToken,
        link,
      },
    );

    return rawPlaylist;
  }

  private generateExportId(): string {
    return nanoid();
  }

  private async exportPlaylist({
    accessToken,
    userId,
    platform,
    playlist,
  }: {
    accessToken: string;
    userId: string;
    platform: PlatformType;
    playlist: IRawPlaylist & { _id?: DocumentId };
  }): Promise<{ url: string }> {
    const result = await thirdPartyIntegrations.createPlaylist(platform, {
      accessToken,
      userId,
      playlist,
    });

    // Save this as a conversion in the DB
    await this.conversionService.createConversion({
      importLink: playlist.importLink,
      exportLink: result.url,
      toPlatform: platform,
      playlist: playlist._id,
    });

    return result;
  }
}
