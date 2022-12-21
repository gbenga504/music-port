import { AxiosError } from "axios";
import { Router } from "express";
import { routeIds } from "../app/routes";

import { constructURL } from "../utils/url";

const routes = Router();

routes.get(
  "/auth/:platform(spotify|deezer)/callback",
  async (req, res, _next) => {
    const { state, code } = req.query as { code: string; state: string };
    const { platform } = req.params;

    try {
      const { importLink } = JSON.parse(
        Buffer.from(state, "base64").toString(),
      ) as { importLink: string };

      const tokens = await req.api.auth.authenticateUser({ platform, code });

      res.cookie("accessToken", tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      const path = constructURL({ routeId: routeIds.importReview });
      const fullPath = `${path}?importLink=${importLink}`;

      res.status(200).redirect(fullPath);
    } catch (error) {
      // TODO: Report to Logging service
      console.error(error);
      const { response } = error as AxiosError;

      res.status(response?.status || 500).send(response?.data);
    }
  },
);

export default routes;
