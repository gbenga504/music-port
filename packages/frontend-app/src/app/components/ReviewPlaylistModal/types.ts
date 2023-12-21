import type { ObjectValues } from "../../../types/types";

export const PlaylistAction = {
  CREATE_PLAYLIST: "CREATE_PLAYLIST",
} as const;

export const PlaylistActionValues = Object.values(PlaylistAction);

export type PlaylistActionType = ObjectValues<typeof PlaylistAction>;
