import { z } from "zod";

export const createPlaylistGenreSchema = z.object({
  name: z.string().max(20),
  isSystemGenerated: z.boolean(),
});

export type createPlaylistGenreOutput = z.output<
  typeof createPlaylistGenreSchema
>;
