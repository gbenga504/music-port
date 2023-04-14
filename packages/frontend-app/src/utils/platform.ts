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
}

export const PlaylistGenreValues = Object.values(PlaylistGenre) as [
  PlaylistGenre,
  ...PlaylistGenre[],
];
