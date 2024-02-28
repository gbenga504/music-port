import {
  createPlaylistGenreSchema,
  editPlaylistGenreSchema,
} from "./validator";

import type { PlaylistGenreRepository } from "./repository";
import type { IPlaylistGenre } from "../models";
import type { DocumentId } from "../models/helper";

interface IConstructorOptions {
  playlistGenreRepository: PlaylistGenreRepository;
}

export class PlaylistGenreService {
  private playlistGenreRepository: PlaylistGenreRepository;

  constructor({ playlistGenreRepository }: IConstructorOptions) {
    this.playlistGenreRepository = playlistGenreRepository;
  }

  async createPlaylistGenre({
    inputs,
  }: {
    inputs: {
      name: string;
      isSystemGenerated: boolean;
    };
  }): Promise<IPlaylistGenre> {
    const validInputs = createPlaylistGenreSchema.parse(inputs);

    return this.playlistGenreRepository.create(validInputs);
  }

  async editPlaylistGenre({
    inputs,
  }: {
    inputs: {
      id: string;
      name?: string | null;
      isSystemGenerated?: boolean | null;
    };
  }): Promise<IPlaylistGenre> {
    const { id, ...rest } = editPlaylistGenreSchema.parse(inputs);

    return this.playlistGenreRepository.edit(id, rest);
  }

  async getById({
    id,
  }: {
    id: DocumentId | string;
  }): Promise<IPlaylistGenre | null> {
    return this.playlistGenreRepository.findById(id);
  }

  async getPlaylistGenres({
    currentPage,
    pageSize,
  }: {
    currentPage: number;
    pageSize: number;
  }): Promise<ReturnType<PlaylistGenreRepository["findManyPlaylist"]>> {
    return this.playlistGenreRepository.findManyPlaylist(
      {},
      currentPage,
      pageSize,
    );
  }
}
