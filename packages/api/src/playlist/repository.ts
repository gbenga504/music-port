import { IFindOneOptions, Repository } from "../framework/repository";
import * as Models from "../models";

import type { ObjectId } from "mongoose";
import type { IPlaylist } from "../models";

export class PlaylistRepository extends Repository<IPlaylist> {
  constructor() {
    super({ model: Models.Playlist });
  }

  public async create(playlist: Partial<IPlaylist>): Promise<IPlaylist> {
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
}
