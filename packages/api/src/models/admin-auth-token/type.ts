import type { ObjectId } from "mongodb";

export interface IAdminAuthToken {
  _id: ObjectId;
  platform: "spotify" | "deezer" | "youtubeMusic";
  token: string;
  userId?: string;
}
