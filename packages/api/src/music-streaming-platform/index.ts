import spotify from "./spotify";
import deezer from "./deezer";

export const getPassportStrategies = {
  spotify: spotify.getPassportStrategy(),
  deezer: deezer.getPassportStrategy(),
};
