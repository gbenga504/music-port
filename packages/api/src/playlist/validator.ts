import { z } from "zod";
import { ResourceError } from "../errors/resource-error";
import {
  getPlatformNameOrThrow,
  PlatformValues,
  PlaylistGenreValues,
} from "../utils/platform";

const convertPlaylistUsingAdminAuthTokenSchema = z.object({
  fromPlatform: z.enum(PlatformValues),
  toPlatform: z.enum(PlatformValues),
  link: z
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
});

export type convertPlaylistUsingAdminAuthTokenOutput = z.output<
  typeof convertPlaylistUsingAdminAuthTokenSchema
>;

export const convertPlaylistUsingAdminAuthToken = (
  input: any,
): convertPlaylistUsingAdminAuthTokenOutput => {
  // TODO: throw a proper validation error that can be sent back to the user
  return convertPlaylistUsingAdminAuthTokenSchema.parse(input);
};

const convertPlaylistSchema = z.object({
  platform: z.enum(PlatformValues),
  playlistExportId: z.string(),
});

export type convertPlaylistOutput = z.output<typeof convertPlaylistSchema>;

export const convertPlaylist = (input: any): convertPlaylistOutput => {
  // TODO: throw a proper validation error that can be sent back to the user
  return convertPlaylistSchema.parse(input);
};

const createPlaylistSchema = z.object({
  author: z.string().max(50),
  playlistTitle: z.string().max(50),
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
  platform: z.enum(PlatformValues),
});

export type createPlaylistOutput = z.output<typeof createPlaylistSchema>;

export const createPlaylist = (input: any): createPlaylistOutput => {
  // TODO: throw a proper validation error that can be sent back to the user
  return createPlaylistSchema.parse(input);
};
