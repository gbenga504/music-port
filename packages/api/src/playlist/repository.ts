import { ObjectId as MongoObjectId } from "mongodb";

import {
  IFindMany,
  IFindOneOptions,
  Repository,
} from "../framework/repository";
import * as Models from "../models";

import type { IPlaylist } from "../models";
import type { ObjectId } from "mongoose";

export class PlaylistRepository extends Repository<IPlaylist> {
  constructor() {
    super({ model: Models.Playlist });
  }

  public async create(playlist: Omit<IPlaylist, "_id">): Promise<IPlaylist> {
    return this.createOne(playlist);
  }

  public async findById(
    id: ObjectId | string,
    options?: IFindOneOptions,
  ): Promise<IPlaylist | null> {
    return this.findOneById(id, options);
  }

  public async findOneByExportId(
    exportId: string,
    options?: IFindOneOptions,
  ): Promise<IPlaylist | null> {
    return this.findOne({ exportId }, options);
  }

  public async findOneByImportPlaylistId(
    importPlaylistId: string,
    options?: IFindOneOptions,
  ): Promise<IPlaylist | null> {
    return this.findOne({ importPlaylistId }, options);
  }

  public async findManyPlaylist(
    query: { genre?: string | null },
    currentPage: number,
    pageSize: number,
  ): Promise<IFindMany<IPlaylist>> {
    const finalQuery: Partial<typeof query> = {};

    if (query.genre) {
      finalQuery["genre"] = query.genre;
    }

    return this.findMany({
      query: finalQuery,
      sort: { createdAt: -1 },
      paginationParams: { currentPage, limit: pageSize },
    });
  }

  public async findManyPlaylistSongs(
    playlistId: string,
    currentPage: number,
    pageSize: number,
  ): Promise<IFindMany<IPlaylist["songs"][number]>> {
    // TODO: Revamp this repository and make it more scalable
    // We should have a Songs table

    const playlist = await this.findMany({
      query: { _id: new MongoObjectId(playlistId) },
      sort: { createdAt: -1 },
      projections: { songs: 1 },
    });

    if (playlist.total > 1) {
      throw new Error("There are more than one playlist");
    }

    const skip = (currentPage - 1) * pageSize;

    return {
      total: playlist.data[0].songs.length,
      pageSize,
      currentPage,
      data: playlist.data[0].songs.slice(skip, skip + pageSize),
    };
  }
}
