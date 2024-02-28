import type { PlatformType } from "../../utils/platform";
import type { DocumentId } from "../helper";

export interface Image {
  url: string;
  width?: number;
  height?: number;
}

export interface Artist {
  name: string;
}

export interface Song {
  artists: [Artist, ...Artist[]];
  images: Image[];
  name: string;
  previewURL?: string;
  duration: number;
}

export interface IPlaylist {
  _id: DocumentId;
  importLink: string;
  public: boolean;
  platform: PlatformType;
  importPlaylistId: string;
  exportId: string;
  images: Image[];
  apiLink: string;
  name: string;
  owner: {
    name: string;
  };
  songs: [Song, ...Song[]];
  genre: DocumentId;
  duration: number;
}

export type IRawPlaylist = Omit<IPlaylist, "_id" | "exportId" | "genre">;
