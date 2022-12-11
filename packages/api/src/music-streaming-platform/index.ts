import { URL } from "node:url";

import spotify from "./spotify";
import deezer from "./deezer";
import { InvalidMusicStreamingPlatformError } from "../errors/invalid-music-streaming-platform-error";

import type { IMusicStreamingPlatform } from "./types";

export const getPassportStrategies = {
  spotify: spotify.getPassportStrategy(),
  deezer: deezer.getPassportStrategy(),
};

export function authenticate(
  platform: string | null,
  ...rest: Parameters<IMusicStreamingPlatform["authenticate"]>
): ReturnType<IMusicStreamingPlatform["authenticate"]> {
  let authenticationMethodForPlatform = null;

  switch (platform) {
    case "spotify":
      authenticationMethodForPlatform = spotify.authenticate;
      break;
    case "deezer":
      authenticationMethodForPlatform = deezer.authenticate;
      break;
    default:
      throw new InvalidMusicStreamingPlatformError({
        message: `No authentication method available for ${platform}`,
      });
  }

  return authenticationMethodForPlatform(...rest);
}

export function getPlaylist(
  platform: string | null,
  ...rest: Parameters<IMusicStreamingPlatform["getPlaylist"]>
): ReturnType<IMusicStreamingPlatform["getPlaylist"]> {
  let getPlaylistMethod = null;

  switch (platform) {
    case "spotify":
      getPlaylistMethod = spotify.getPlaylist;
      break;
    case "deezer":
      getPlaylistMethod = deezer.getPlaylist;
      break;
    default:
      throw new InvalidMusicStreamingPlatformError({
        message: `No authentication method available for ${platform}`,
      });
  }

  return getPlaylistMethod(...rest);
}

export function getPlatformName(link: string): string | null {
  const url = new URL(link);
  const origin = url.origin;

  if (origin.indexOf("spotify.com") !== -1) {
    return "spotify";
  }

  if (origin.indexOf("deezer.com") !== -1) {
    return "deezer";
  }

  return null;
}
