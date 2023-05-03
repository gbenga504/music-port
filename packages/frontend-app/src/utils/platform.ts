export enum Platform {
  Spotify = "spotify",
  Deezer = "deezer",
}

export const PlatformValues = Object.values(Platform) as [
  Platform,
  ...Platform[],
];

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

export const PlaylistGenreValues = Object.values(PlaylistGenre) as [
  PlaylistGenre,
  ...PlaylistGenre[],
];
