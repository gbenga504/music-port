import {
  PlaylistPlatform,
  PlaylistGenre as PGenre,
} from "../app/api/graphql/graphql-client.gen";

// @TODO: Delete this type
export enum Platform {
  Spotify = "spotify",
  Deezer = "deezer",
  YoutubeMusic = "youtubeMusic",
}

export const PlatformValues = Object.values(Platform) as [
  Platform,
  ...Platform[],
];

// @TODO: Delete this type
export enum PlaylistGenre {
  ALL = "All",
  Afro = "Afro",
  HipPop = "HipPop",
  Others = "Others",
  Rap = "Rap",
  Rock = "Rock",
  Jazz = "Jazz",
  Blues = "Blues",
  Classical = "Classical",
  CountryMusic = "Country",
  DanceMusic = "Dance",
  Reggae = "Reggae",
  KPop = "KPop",
}

export const PlaylistGenreValues = Object.values(PGenre) as [
  PGenre,
  ...PGenre[],
];

export const PlaylistPlatformValues = Object.values(PlaylistPlatform) as [
  PlaylistPlatform,
  ...PlaylistPlatform[],
];
