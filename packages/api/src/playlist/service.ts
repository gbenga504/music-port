import { nanoid } from "nanoid";

import { IPlaylist } from "../models";
import * as musicStreamingPlatform from "../music-streaming-platform";

import type { ObjectId } from "mongoose";
import type { PlaylistRepository } from "./repository";

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

    const rawPlaylist = await musicStreamingPlatform.getPlaylist(platform, {
      accessToken,
      link,
    });

    const playlist = {
      ...rawPlaylist,
      exportLink: this.generateExportLink(),
    };

    return this.playlistRepository.create(playlist);
  }

  async getById({ id }: { id: ObjectId | string }): Promise<IPlaylist | null> {
    return this.playlistRepository.findById(id);
  }

  async getByExportLink({
    exportLink,
  }: {
    exportLink: string;
  }): Promise<IPlaylist | null> {
    return this.playlistRepository.findByExportLink(exportLink);
  }

  private generateExportLink(): string {
    const id = nanoid();

    return `${process.env.FRONTEND_EXPORT_URL}/${id}`;
  }
}
