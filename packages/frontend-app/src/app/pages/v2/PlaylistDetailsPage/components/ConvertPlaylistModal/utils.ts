import { z } from "zod";

import { formatError } from "../../../../../../utils/form-validation";
import { PlaylistPlatformValues } from "../../../../../../utils/platform";

export const CONVERT_PLAYLIST_MODAL_LOCAL_STORAGE_KEY =
  "CONVERT_PLAYLIST_MODAL";

const convertPlaylistSchema = z.object({
  // TODO: Parse as object id instead
  exportId: z.string(),
  platform: z.enum(PlaylistPlatformValues),
});

export type ConvertPlaylist = z.infer<typeof convertPlaylistSchema>;
export function parseConvertPlaylist(data: unknown): ConvertPlaylist {
  return convertPlaylistSchema.parse(data);
}

const initiateConvertPlaylistSchema = z.object({
  platform: z.enum(PlaylistPlatformValues),
});

export type InitiateConvertPlaylist = z.infer<
  typeof initiateConvertPlaylistSchema
>;
export const parseInitiateConvertPlaylist = (
  input: InitiateConvertPlaylist,
): { [key: string]: string } => {
  try {
    convertPlaylistSchema.parse(input);

    return {};
  } catch (error) {
    return formatError(error);
  }
};
