import type { ObjectValues } from "../types/types";

export const Platform = {
  Spotify: "spotify",
  Deezer: "deezer",
  YoutubeMusic: "youtubeMusic",
} as const;

export type PlatformType = ObjectValues<typeof Platform>;
export const PlatformValues = Object.values(Platform);

export const MAX_SONGS_PER_PLAYLIST = 50;
