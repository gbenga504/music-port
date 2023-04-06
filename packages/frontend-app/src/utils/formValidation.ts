import { z, ZodError } from "zod";
import { PlatformValues } from "./platform";

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
  link: z.string().url(),
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
