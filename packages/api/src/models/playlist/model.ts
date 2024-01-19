import { Schema, model, SchemaTypes } from "mongoose";

import { PlatformValues } from "../../utils/platform";

import type { Artist, Image, IPlaylist, Song } from "./type";

const ImageSchema = new Schema<Image>(
  {
    url: { type: String, required: true },
    width: Number,
    height: Number,
  },
  { _id: false, timestamps: false },
);

const SongSchema = new Schema<Song>({
  artists: [
    {
      type: new Schema<Artist>(
        {
          name: { type: String, required: true },
        },
        { _id: false, timestamps: false },
      ),
    },
  ],
  images: [{ type: ImageSchema, required: true }],
  name: { type: String, required: true },
  previewURL: String,
  duration: { type: Number, required: true },
});

const PlaylistSchema = new Schema<IPlaylist>(
  {
    importLink: { type: String, required: true, unique: true },
    public: { type: Boolean, required: true },
    platform: { type: String, enum: PlatformValues, required: true },
    importPlaylistId: { type: String, required: true },
    exportId: { type: String, required: true },
    images: [
      {
        type: ImageSchema,
        required: true,
      },
    ],
    apiLink: { type: String, required: true },
    name: { type: String, required: true },
    owner: {
      type: new Schema(
        { name: { type: String, required: true } },
        { _id: false, timestamps: false },
      ),
      required: true,
    },
    songs: [
      {
        type: SongSchema,
        required: true,
      },
    ],
    genre: {
      type: SchemaTypes.ObjectId,
      ref: "PlaylistGenre",
      required: true,
    },
    duration: { type: Number, required: true },
  },
  { timestamps: true },
);

PlaylistSchema.index({
  exportId: 1,
});

PlaylistSchema.index({
  importLink: 1,
});

PlaylistSchema.index({
  genre: 1,
});

export default model<IPlaylist>("Playlist", PlaylistSchema);
