import { Strategy } from "passport-deezer";
import type { StrategyOptions } from "passport-deezer";

import type { IMusicStreamingPlatform } from "./types";

const clientID = process.env.SPOTIFY_CLIENTID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const callbackURL = process.env.FRONTEND_AUTH_CALLBACK_URL;

class Deezer implements IMusicStreamingPlatform {
  private readonly appName: string = "deezer";

  getAppName(): string {
    return this.appName;
  }

  getPassportStrategy(): Strategy {
    return new Strategy(
      {
        clientID,
        clientSecret,
        callbackURL,
        scope: ["basic_access", "manage_library"],
      } as StrategyOptions,
      function (accessToken, refreshToken, _profile, done) {
        return done(null, { accessToken, refreshToken, expiresIn: null });
      },
    );
  }
}

const deezer = new Deezer();
export default deezer;
