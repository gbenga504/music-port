import { z } from "zod";

import { formatError } from "../../../../../../utils/form-validation";
import { PlaylistPlatformValues } from "../../../../../../utils/platform";

export const PORT_PLAYLIST_MODAL_LOCAL_STORAGE_KEY = "PORT_PLAYLIST_MODAL";

const portPlaylistSchema = z.object({
  // TODO: Parse as object id instead
  exportId: z.string(),
  platform: z.enum(PlaylistPlatformValues),
});

export type portPlaylist = z.infer<typeof portPlaylistSchema>;
export function parsePortPlaylist(data: unknown): portPlaylist {
  return portPlaylistSchema.parse(data);
}

const initiatePortPlaylistSchema = z.object({
  platform: z.enum(PlaylistPlatformValues),
});

export type InitiatePortPlaylist = z.infer<typeof initiatePortPlaylistSchema>;
export const parseInitiatePortPlaylist = (
  input: InitiatePortPlaylist,
): { [key: string]: string } => {
  try {
    initiatePortPlaylistSchema.parse(input);

    return {};
  } catch (error) {
    return formatError(error);
  }
};
