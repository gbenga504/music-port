import { Router } from "express";
import passport from "passport";

import {
  getPassportStrategies,
  authenticate as passportAuthenticate,
} from "../third-party-integrations";

import type { PlatformType } from "../utils/platform";

const routes = Router();

Object.values(getPassportStrategies).forEach((strategy) =>
  passport.use(strategy),
);

routes.get(
  `/auth/:platform(${Object.keys(getPassportStrategies).join("|")})`,
  (req, res, next) => {
    const { platform } = req.params;
    const { redirect_uri } = req.query;

    const state = Buffer.from(JSON.stringify({ redirect_uri })).toString(
      "base64",
    );

    passportAuthenticate(platform as PlatformType, { state })(req, res, next);
  },
);

routes.get(
  `/auth/:platform(${Object.keys(getPassportStrategies).join("|")})/callback`,
  (req, res, next) => {
    const { platform } = req.params;
    const { fromAdminAuthTokenGenerator } = req.query;

    passportAuthenticate(
      platform as PlatformType,
      { session: false },
      async (error, tokens) => {
        if (fromAdminAuthTokenGenerator === "true") {
          await req.ctx.adminAuthTokenService.createToken({
            token: tokens.accessToken,
            userId: tokens.userId,
            platform: platform as PlatformType,
          });
        }

        if (error) {
          return res.status(400).json({
            name: error.name,
            message: error.message,
          });
        }

        return res.status(200).json(tokens);
      },
    )(req, res, next);
  },
);

export default routes;
