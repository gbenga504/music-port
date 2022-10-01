import { Strategy } from "passport-spotify";
import type { StrategyOptions } from "passport-spotify";

import type { IMusicStreamingPlatform } from "./types";

const clientID = process.env.SPOTIFY_CLIENTID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const callbackURL = process.env.FRONTEND_AUTH_CALLBACK_URL;

class Spotify implements IMusicStreamingPlatform {
  private readonly appName: string = "spotify";

  getAppName(): string {
    return this.appName;
  }

  getPassportStrategy(): Strategy {
    return new Strategy(
      {
        clientID,
        clientSecret,
        callbackURL,
      } as StrategyOptions,
      function (accessToken, refreshToken, expiresIn, _profile, done) {
        return done(null, { accessToken, refreshToken, expiresIn });
      },
    );
  }
}

const spotify = new Spotify();
export default spotify;
