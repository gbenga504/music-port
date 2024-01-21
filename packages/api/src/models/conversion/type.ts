import type { PlatformType } from "../../utils/platform";
import type { ObjectId } from "mongodb";

export interface IConversion {
  _id: ObjectId;
  importLink: string;
  exportLink: string;
  toPlatform: PlatformType;
  playlistId?: ObjectId;
}
