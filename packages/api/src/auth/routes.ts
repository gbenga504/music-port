import { Router } from "express";
import passport from "passport";

import {
  getPassportStrategies,
  authenticate as passportAuthenticate,
} from "../music-streaming-platform";

const routes = Router();

Object.values(getPassportStrategies).forEach((strategy) =>
  passport.use(strategy),
);

routes.get(
  `/auth/:platform(${Object.keys(getPassportStrategies).join("|")})`,
  (req, res, next) => {
    const { platform } = req.params;
    const { importLink, exportId } = req.query;

    const state = Buffer.from(
      JSON.stringify({ importLink, exportId, platform }),
    ).toString("base64");

    passportAuthenticate(platform, { state })(req, res, next);
  },
);

routes.get(
  `/auth/:platform(${Object.keys(getPassportStrategies).join("|")})/callback`,
  (req, res, next) => {
    const { platform } = req.params;

    passportAuthenticate(platform, { session: false }, (error, tokens) => {
      if (error) {
        return res.status(400).json({
          name: error.name,
          message: error.message,
        });
      }

      return res.status(200).json(tokens);
    })(req, res, next);
  },
);

export default routes;
