import { ResourceError } from "../errors/resource-error";

export enum Platform {
  Spotify = "spotify",
  Deezer = "deezer",
}

export const PlatformValues = Object.values(Platform) as [
  Platform,
  ...Platform[],
];

export const getPlatformName = (link: string): Platform | null => {
  let origin: string | null;

  try {
    const url = new URL(link);
    origin = url.origin;
  } catch (error) {
    origin = "";
  }

  if (origin.indexOf("spotify.com") !== -1) {
    return Platform.Spotify;
  }

  if (origin.indexOf("deezer.com") !== -1) {
    return Platform.Deezer;
  }

  return null;
};

export const getPlatformNameOrThrow = (link: string): Platform => {
  const platformName = getPlatformName(link);

  if (!platformName) {
    throw new ResourceError({
      resource: "Playlist",
      message: "Playlists not currently supported",
    });
  }

  return platformName;
};

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
}

export const PlaylistGenreValues = Object.values(PlaylistGenre) as [
  PlaylistGenre,
  ...PlaylistGenre[],
];
