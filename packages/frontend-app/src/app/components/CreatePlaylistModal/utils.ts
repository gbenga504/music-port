import { z } from "zod";

import {
  PlaylistGenreValues,
  PlaylistPlatformValues,
} from "../../../utils/platform";

import type { PlaylistPlatform } from "../../api/graphql/graphql-client.gen";
import type { PlaylistGenre } from "../../api/graphql/graphql-client.gen";

export const REVIEW_PLAYLIST_MODAL_LOCAL_STORAGE_KEY = "REVIEW_PLAYLIST_MODAL";

const validateModalDataSchema = z.object({
  author: z.string(),
  playlistLink: z.string(),
  playlistGenre: z.enum(
    PlaylistGenreValues as [PlaylistGenre, ...PlaylistGenre[]],
  ),
  streamingService: z.enum(
    PlaylistPlatformValues as [PlaylistPlatform, ...PlaylistPlatform[]],
  ),
});

export type ValidateModalData = z.infer<typeof validateModalDataSchema>;

export function parseModalData(data: unknown): ValidateModalData {
  return validateModalDataSchema.parse(data);
}
