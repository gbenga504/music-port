import type { Platform } from "../../utils/platform";
import type { ObjectId } from "mongoose";

export interface IConversion {
  _id: ObjectId;
  importLink: string;
  exportLink: string;
  toPlatform: Platform;
  playlistId?: ObjectId;
}
