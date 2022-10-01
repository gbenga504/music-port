import type { Strategy as SpotifyStrategy } from "passport-spotify";
import type { Strategy as DeezerStrategy } from "passport-deezer";

export interface IMusicStreamingPlatform {
  getAppName: () => string;
  getPassportStrategy: () => DeezerStrategy | SpotifyStrategy;
}
