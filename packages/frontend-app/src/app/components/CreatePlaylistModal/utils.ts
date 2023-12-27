import { z } from "zod";

import { ResourceError } from "../../../errors/resource-error";
import { formatError } from "../../../utils/form-validation";
import {
  PlaylistGenreValues,
  PlaylistPlatformValues,
} from "../../../utils/platform";
import { getPlatformNameOrThrow } from "../../../utils/url";

import type { PlaylistPlatform } from "../../api/graphql/graphql-client.gen";
import type { PlaylistGenre } from "../../api/graphql/graphql-client.gen";

export const REVIEW_PLAYLIST_MODAL_LOCAL_STORAGE_KEY = "REVIEW_PLAYLIST_MODAL";

const reviewPlaylistSchema = z.object({
  author: z.string(),
  playlistLink: z.string(),
  playlistGenre: z.enum(
    PlaylistGenreValues as [PlaylistGenre, ...PlaylistGenre[]],
  ),
  streamingService: z.enum(
    PlaylistPlatformValues as [PlaylistPlatform, ...PlaylistPlatform[]],
  ),
});

export type ReviewPlaylist = z.infer<typeof reviewPlaylistSchema>;
export function parseReviewPlaylist(data: unknown): ReviewPlaylist {
  return reviewPlaylistSchema.parse(data);
}

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
  playlistGenre: z.enum(PlaylistGenreValues),
  streamingService: z.enum(PlaylistPlatformValues),
});

export type CreatePlaylist = z.infer<typeof createPlaylistSchema>;
export const parseCreatePlaylist = (
  input: CreatePlaylist,
): { [key: string]: string } => {
  try {
    createPlaylistSchema.parse(input);

    return {};
  } catch (error) {
    return formatError(error);
  }
};
