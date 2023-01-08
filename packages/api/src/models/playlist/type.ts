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
}

export interface IPlaylist {
  _id: ObjectId;
  importLink: string;
  public: boolean;
  platform: "spotify" | "deezer";
  importPlaylistId: string;
  exportId: string;
  images: Image[];
  apiLink: string;
  name: string;
  owner: {
    name: string;
  };
  songs: [Song, ...Song[]];
}

export type IRawPlaylist = Pick<
  IPlaylist,
  | "importLink"
  | "images"
  | "apiLink"
  | "name"
  | "owner"
  | "songs"
  | "importPlaylistId"
  | "public"
  | "platform"
>;
