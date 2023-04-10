import { IPlaylist, IRawPlaylist } from "../models";
import * as thirdPartyIntegrations from "../third-party-integrations";

import type { ObjectId } from "mongoose";
import type { PlaylistRepository } from "./repository";
import type { Platform } from "../utils/platform";
import type { AdminAuthTokenService } from "../admin-auth-token/service";
import type { ConversionService } from "../conversion/service";

interface IConstructorOptions {
  playlistRepository: PlaylistRepository;
  adminAuthTokenService: AdminAuthTokenService;
  conversionService: ConversionService;
}

export class PlaylistService {
  private playlistRepository: PlaylistRepository;
  private adminAuthTokenService: AdminAuthTokenService;
  private conversionService: ConversionService;

  constructor({
    playlistRepository,
    adminAuthTokenService,
    conversionService,
  }: IConstructorOptions) {
    this.playlistRepository = playlistRepository;
    this.adminAuthTokenService = adminAuthTokenService;
    this.conversionService = conversionService;
  }

  async convertPlaylistUsingAdminAuthToken({
    fromPlatform,
    toPlatform,
    userAccessToken,
    userId,
    link,
  }: {
    fromPlatform: string;
    toPlatform: string;
    userAccessToken: string;
    userId: string;
    link: string;
  }): Promise<{ url: string }> {
    const adminAccessToken =
      await this.adminAuthTokenService.getTokenByPlatform({
        platform: fromPlatform as Platform,
      });

    const rawPlaylist = await this.importPlaylist({
      accessToken: adminAccessToken.token,
      link,
    });

    return this.exportPlaylist({
      accessToken: userAccessToken,
      userId,
      platform: toPlatform as Platform,
      playlist: rawPlaylist,
    });
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

  async exportPlaylist({
    accessToken,
    userId,
    platform,
    playlist,
  }: {
    accessToken: string;
    userId: string;
    platform: Platform;
    playlist: IRawPlaylist & { _id?: ObjectId };
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
      playlistId: playlist._id,
    });

    return result;
  }

  async getById({ id }: { id: ObjectId | string }): Promise<IPlaylist | null> {
    return this.playlistRepository.findById(id);
  }

  async getByExportId({
    exportId,
  }: {
    exportId: string;
  }): Promise<IPlaylist | null> {
    return this.playlistRepository.findOneByExportId(exportId);
  }
}
