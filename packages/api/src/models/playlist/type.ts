import type { Platform, PlaylistGenre } from "../../utils/platform";
import type { ObjectId } from "mongoose";

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
  _id: ObjectId;
  importLink: string;
  public: boolean;
  platform: Platform;
  importPlaylistId: string;
  exportId: string;
  images: Image[];
  apiLink: string;
  name: string;
  owner: {
    name: string;
  };
  songs: [Song, ...Song[]];
  genre: PlaylistGenre;
  duration: number;
}

export type IRawPlaylist = Omit<IPlaylist, "_id" | "exportId" | "genre">;
