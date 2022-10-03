import spotify from "./spotify";
import deezer from "./deezer";

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
      throw new Error("UNKNOWN");
  }

  return authenticationMethodForPlatform(...rest);
}
