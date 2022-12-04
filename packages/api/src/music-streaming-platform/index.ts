import spotify from "./spotify";
import deezer from "./deezer";
import { InvalidMusicStreamingPlatformError } from "../errors/invalid-music-streaming-platform-error";

import type { IMusicStreamingPlatform } from "./types";

export const getPassportStrategies = {
  spotify: spotify.getPassportStrategy(),
  deezer: deezer.getPassportStrategy(),
};

export function authenticate(
  platform: string,
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
