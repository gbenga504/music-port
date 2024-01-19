import { Schema, model } from "mongoose";

import type { IPlaylistGenre } from "./type";

const PlaylistGenreSchema = new Schema<IPlaylistGenre>(
  {
    name: { type: String, required: true, unique: true },
    isSystemGenerated: { type: Boolean, required: true },
  },
  { timestamps: true },
);

PlaylistGenreSchema.index({
  name: 1,
});

export default model<IPlaylistGenre>("PlaylistGenre", PlaylistGenreSchema);
