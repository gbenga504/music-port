import type { DocumentId } from "../helper";

export interface IAdminAuthToken {
  _id: DocumentId;
  platform: "spotify" | "deezer" | "youtubeMusic";
  token: string;
  userId?: string;
}
