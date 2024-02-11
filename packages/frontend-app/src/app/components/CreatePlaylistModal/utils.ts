import { z } from "zod";

import { ResourceError } from "../../../errors/resource-error";
import { formatError } from "../../../utils/form-validation";
import { PlaylistPlatformValues } from "../../../utils/platform";
import { getPlatformNameOrThrow } from "../../../utils/url";

import type { PlaylistPlatform } from "../../api/graphql/graphql-client.gen";

export const REVIEW_PLAYLIST_MODAL_LOCAL_STORAGE_KEY = "REVIEW_PLAYLIST_MODAL";

const createPlaylistSchema = z.object({
  author: z.string(),
  playlistLink: z
    .string()
    .url()
    .superRefine((value, ctx) => {
      try {
        getPlatformNameOrThrow(value);
      } catch (error) {
        if (error instanceof ResourceError) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: error.message,
          });
        }
      }
    }),
  playlistGenreId: z.string(),
  playlistName: z.string().optional(),
  streamingService: z.enum(
    PlaylistPlatformValues as [PlaylistPlatform, ...PlaylistPlatform[]],
  ),
});

export type CreatePlaylist = z.infer<typeof createPlaylistSchema>;

export const parseCreatePlaylist = (
  input: unknown,
): { [key: string]: string } => {
  try {
    createPlaylistSchema.parse(input);

    return {};
  } catch (error) {
    return formatError(error);
  }
};

export const parseReviewPlaylist = (input: unknown): CreatePlaylist => {
  return createPlaylistSchema.parse(input);
};
