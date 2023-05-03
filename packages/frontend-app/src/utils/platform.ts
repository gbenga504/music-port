export enum Platform {
  Spotify = "spotify",
  Deezer = "deezer",
}

export const PlatformValues = Object.values(Platform) as [
  Platform,
  ...Platform[],
];

export enum PlaylistGenre {
  Afro = "afro",
  HipPop = "hipPop",
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
  ALL = "all",
}

export const PlaylistGenreValues = Object.values(PlaylistGenre) as [
  PlaylistGenre,
  ...PlaylistGenre[],
];
