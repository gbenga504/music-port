import type { ObjectId } from "mongoose";

export interface IAdminAuthToken {
  _id: ObjectId;
  platform: "spotify" | "deezer";
  token: string;
  userId?: string;
}
