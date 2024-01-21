import { z } from "zod";

import { ResourceError } from "../errors/resource-error";
import { getPlatformNameOrThrow } from "../third-party-integrations";
import { PlatformValues } from "../utils/platform";
import * as zodUtils from "../utils/zod-utils";

import type { PlatformType } from "../utils/platform";

const convertPlaylistUsingAdminAuthTokenSchema = z.object({
  fromPlatform: z.enum(PlatformValues as [PlatformType, ...PlatformType[]]),
  toPlatform: z.enum(PlatformValues as [PlatformType, ...PlatformType[]]),
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
  platform: z.enum(PlatformValues as [PlatformType, ...PlatformType[]]),
  playlistExportId: z.string(),
});

export type convertPlaylistOutput = z.output<typeof convertPlaylistSchema>;

export const convertPlaylist = (input: any): convertPlaylistOutput => {
  // TODO: throw a proper validation error that can be sent back to the user
  return convertPlaylistSchema.parse(input);
};

const createPlaylistSchema = z.object({
  author: z.string().max(50),
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
  playlistGenreId: zodUtils.stringOrObjectId,
  platform: z.enum(PlatformValues as [PlatformType, ...PlatformType[]]),
});

export type createPlaylistOutput = z.output<typeof createPlaylistSchema>;

export const createPlaylist = (input: any): createPlaylistOutput => {
  // TODO: throw a proper validation error that can be sent back to the user
  return createPlaylistSchema.parse(input);
};
