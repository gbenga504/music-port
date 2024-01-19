import type { ObjectId } from "mongodb";

export interface IPlaylistGenre {
  _id: ObjectId;
  name: string;
  isSystemGenerated: boolean;
}
