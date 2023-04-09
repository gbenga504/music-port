export enum Platform {
  Spotify = "spotify",
  Deezer = "deezer",
}

export const PlatformValues = Object.values(Platform) as [
  Platform,
  ...Platform[],
];
