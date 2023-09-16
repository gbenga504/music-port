import { z, ZodError } from "zod";


import { PlatformValues, PlaylistGenreValues } from "./platform";
import { getPlatformNameOrThrow } from "./url";

import { ResourceError } from "../errors/resource-error";

const formatError = (error: unknown): { [key: string]: string } => {
  let formattedError: { [key: string]: { _errors: string[] } } = {};

  if (error instanceof ZodError) {
    formattedError = error.format() as unknown as {
      [key: string]: { _errors: string[] };
    };
  }

  return Object.keys(formattedError).reduce(
    (acc: { [key: string]: string }, field) => {
      if (field && field !== "_errors") {
        acc[field] = formattedError[field]._errors[0];
      }
      return acc;
    },
    {},
  );
};

const convertPlaylistUsingLinkSchema = z.object({
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
  fromPlatform: z.enum(PlatformValues),
  toPlatform: z.enum(PlatformValues),
});

export type convertPlaylistUsingLinkFormInputs = z.infer<
  typeof convertPlaylistUsingLinkSchema
>;

export const validateConvertPlaylistUsingLinkForm = (
  input: convertPlaylistUsingLinkFormInputs,
): { [key: string]: string } => {
  try {
    convertPlaylistUsingLinkSchema.parse(input);

    return {};
  } catch (error) {
    return formatError(error);
  }
};

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
  streamingService: z.enum(PlatformValues),
});

export type createPlaylistFormInputs = z.infer<typeof createPlaylistSchema>;

export const validateCreatePlaylistForm = (
  input: createPlaylistFormInputs,
): { [key: string]: string } => {
  try {
    createPlaylistSchema.parse(input);

    return {};
  } catch (error) {
    return formatError(error);
  }
};

const convertPlaylistSchema = z.object({
  platform: z.enum(PlatformValues),
});

export type convertPlaylistFormInputs = z.infer<typeof convertPlaylistSchema>;

export const validateConvertPlaylistForm = (
  input: convertPlaylistFormInputs,
): { [key: string]: string } => {
  try {
    convertPlaylistSchema.parse(input);

    return {};
  } catch (error) {
    return formatError(error);
  }
};
