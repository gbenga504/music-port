import type { ObjectId } from "mongoose";
import type { Platform } from "../../utils/platform";

export interface IConversion {
  _id: ObjectId;
  importLink: string;
  exportLink: string;
  toPlatform: Platform;
  playlistId?: ObjectId;
}
