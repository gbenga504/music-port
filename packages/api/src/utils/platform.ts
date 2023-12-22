import type { ObjectValues } from "../types/types";

export const Platform = {
  Spotify: "spotify",
  Deezer: "deezer",
  YoutubeMusic: "youtubeMusic",
} as const;

export type PlatformType = ObjectValues<typeof Platform>;
export const PlatformValues = Object.values(Platform);

export const PLAYLIST_GENRE = {
  Afro: "Afro",
  HipPop: "HipPop",
  Others: "Others",
  Rap: "Rap",
  Rock: "Rock",
  Jazz: "Jazz",
  Blues: "Blues",
  Classical: "Classical",
  CountryMusic: "Country",
  DanceMusic: "Dance",
  Reggae: "Reggae",
  KPop: "KPop",
} as const;

export type PlaylistGenreType = ObjectValues<typeof PLAYLIST_GENRE>;
export const PlaylistGenreValues = Object.values(PLAYLIST_GENRE);

export const MAX_SONGS_PER_PLAYLIST = 50;
