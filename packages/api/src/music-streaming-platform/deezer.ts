import passport from "passport";
import { Strategy } from "passport-deezer";
import type { StrategyOptions } from "passport-deezer";

import type { IMusicStreamingPlatform } from "./types";

const clientID = process.env.DEEZER_CLIENTID;
const clientSecret = process.env.DEEZER_CLIENT_SECRET;
const callbackURL = process.env.FRONTEND_AUTH_CALLBACK_URL;

class Deezer implements IMusicStreamingPlatform {
  private readonly appName: string = "deezer";

  getAppName(): ReturnType<IMusicStreamingPlatform["getAppName"]> {
    return this.appName;
  }

  getPassportStrategy(): ReturnType<
    IMusicStreamingPlatform["getPassportStrategy"]
  > {
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

  authenticate(
    ...args: Parameters<IMusicStreamingPlatform["authenticate"]>
  ): ReturnType<IMusicStreamingPlatform["authenticate"]> {
    return passport.authenticate(
      "deezer",
      {
        ...args[0],
      },
      args[1],
    );
  }
}

const deezer = new Deezer();
export default deezer;
