import type { DocumentId } from "../helper";

export interface IPlaylistGenre {
  _id: DocumentId;
  name: string;
  isSystemGenerated: boolean;
}
