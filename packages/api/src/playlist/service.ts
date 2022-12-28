import { nanoid } from "nanoid";

import { IPlaylist } from "../models";
import * as musicStreamingPlatform from "../music-streaming-platform";

import type { ObjectId } from "mongoose";
import type { PlaylistRepository } from "./repository";
import { MusicStreamingPlatformResourceFailureError } from "../errors/music-streaming-platform-resource-failure-error";

interface IConstructorOptions {
  playlistRepository: PlaylistRepository;
}

export class PlaylistService {
  private playlistRepository: PlaylistRepository;

  constructor({ playlistRepository }: IConstructorOptions) {
    this.playlistRepository = playlistRepository;
  }

  async importPlaylist({
    accessToken,
    link,
  }: {
    accessToken: string;
    link: string;
  }): Promise<IPlaylist> {
    const platform = musicStreamingPlatform.getPlatformName(link);

    // We don't want to send a request to the music streaming service neither
    // do we want to save a playlist more than once. So we check if the import link
    // already exists in our DB and we return early
    const importPlaylistId = musicStreamingPlatform.getImportPlaylistId(link);
    const existingPlaylist =
      await this.playlistRepository.findOneByImportPlaylistId(importPlaylistId);

    if (existingPlaylist) {
      return existingPlaylist;
    }

    const rawPlaylist = await musicStreamingPlatform.getPlaylist(platform, {
      accessToken,
      link,
    });

    const playlist = {
      ...rawPlaylist,
      exportId: this.generateExportId(),
    };

    return this.playlistRepository.create(playlist);
  }

  async exportPlaylist({
    accessToken,
    userId,
    platform,
    exportId,
  }: {
    accessToken: string;
    userId: string;
    platform: string;
    exportId: string;
  }): Promise<void> {
    const playlist = await this.playlistRepository.findOneByExportId(exportId);

    if (!playlist) {
      throw new MusicStreamingPlatformResourceFailureError({
        message: "Wrong export Id",
      });
    }

    return musicStreamingPlatform.createPlaylist(platform, {
      accessToken,
      userId,
      playlist,
    });
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

  private generateExportId(): string {
    return nanoid();
  }
}
