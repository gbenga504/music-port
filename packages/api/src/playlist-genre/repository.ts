import { NotFoundError } from "../errors/not-found-error";
import { Repository } from "../framework/repository";
import * as Models from "../models";

import type { IFindMany, IFindOneOptions } from "../framework/repository";
import type { IPlaylistGenre } from "../models";
import type { ObjectId } from "mongodb";

export class PlaylistGenreRepository extends Repository<IPlaylistGenre> {
  constructor() {
    super({ model: Models.PlaylistGenre });
  }

  public async create(
    playlistGenre: Omit<IPlaylistGenre, "_id">,
  ): Promise<IPlaylistGenre> {
    return this.createOne(playlistGenre);
  }

  public async edit(
    id: ObjectId,
    playlistGenre: Partial<Omit<IPlaylistGenre, "_id">>,
  ): Promise<IPlaylistGenre> {
    return this.updateOneById(id, playlistGenre);
  }

  public async findById(
    id: ObjectId | string,
    options?: IFindOneOptions,
  ): Promise<IPlaylistGenre | null> {
    return this.findOneById(id, options);
  }

  public async findByIdOrThrow(
    id: ObjectId | string,
    options?: IFindOneOptions,
  ): Promise<IPlaylistGenre> {
    const genre = await this.findOneById(id, options);

    if (!genre) {
      throw new NotFoundError();
    }

    return genre;
  }

  public async findManyPlaylist(
    query: object,
    currentPage: number,
    pageSize: number,
  ): Promise<IFindMany<IPlaylistGenre>> {
    return this.findMany({
      query: query,
      sort: { createdAt: -1 },
      paginationParams: { currentPage, limit: pageSize },
    });
  }
}
