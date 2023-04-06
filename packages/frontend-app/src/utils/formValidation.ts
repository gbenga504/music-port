import { z, ZodError } from "zod";
import { ResourceError } from "../errors/resource-error";

import { PlatformValues } from "./platform";
import { getPlatformNameOrThrow } from "./url";

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
