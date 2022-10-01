import { Router } from "express";
import passport from "passport";

import { getPassportStrategies } from "../music-streaming-platform";

const routes = Router();

Object.values(getPassportStrategies).forEach((strategy) =>
  passport.use(strategy),
);

routes.get("/auth/", (req, res) => {});

export default routes;
