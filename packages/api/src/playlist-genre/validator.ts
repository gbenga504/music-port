import { z } from "zod";

import * as zodUtils from "../utils/zod-utils";

export const createPlaylistGenreSchema = z.object({
  name: z.string().max(20),
  isSystemGenerated: z.boolean(),
});

export type createPlaylistGenreOutput = z.output<
  typeof createPlaylistGenreSchema
>;

export const editPlaylistGenreSchema = createPlaylistGenreSchema
  .deepPartial()
  .extend({
    id: zodUtils.stringOrObjectId,
  });

export type editPlaylistGenreOutput = z.output<typeof editPlaylistGenreSchema>;
