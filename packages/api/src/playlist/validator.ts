import { z } from "zod";
import { ResourceError } from "../errors/resource-error";
import { getPlatformNameOrThrow, PlatformValues } from "../utils/platform";

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
  // TODO: throw a proper validation error that can be sent back to the
  // user
  return convertPlaylistUsingAdminAuthTokenSchema.parse(input);
};
