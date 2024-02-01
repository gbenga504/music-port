import { ObjectId } from "mongodb";

import { Repository } from "../framework/repository";
import * as Models from "../models";

import type { IFindMany, IFindOneOptions } from "../framework/repository";
import type { IPlaylist } from "../models";

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

  public async deleteById(id: ObjectId | string): Promise<IPlaylist | null> {
    return this.deleteOneById(new ObjectId(id));
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
    query: { genre?: ObjectId | string | null },
    currentPage: number,
    pageSize: number,
  ): Promise<IFindMany<IPlaylist>> {
    const finalQuery: Partial<typeof query> = {};

    if (query.genre) {
      finalQuery["genre"] = new ObjectId(query.genre);
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
      query: { _id: new ObjectId(playlistId) },
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

  public async groupPlaylistsByGenre({
    limit = 10,
  }: {
    limit?: number;
  }): Promise<{ genre: Models.IPlaylistGenre; items: IPlaylist[] }[]> {
    const groupedPlaylists = await this.aggregate([
      {
        $lookup: {
          from: "playlistgenres",
          localField: "genre",
          foreignField: "_id",
          as: "genre",
        },
      },
      {
        $unwind: "$genre",
      },
      {
        $group: {
          _id: "$genre.name",
          genre: { $addToSet: "$genre" },
          items: {
            $topN: { n: limit, output: "$$ROOT", sortBy: { createdAt: 1 } },
          },
        },
      },
      {
        $unwind: "$genre",
      },
      {
        $project: {
          genre: "$genre",
          items: "$items",
        },
      },
      {
        $sort: { "genre.name": 1 },
      },
    ]);

    return groupedPlaylists;
  }
}
