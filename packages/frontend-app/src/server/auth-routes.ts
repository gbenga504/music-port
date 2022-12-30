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
      const { importLink, exportId, actionType } = JSON.parse(
        Buffer.from(state, "base64").toString(),
      ) as {
        importLink?: string;
        exportId?: string;
        actionType: "export" | "import";
      };

      const tokens = await req.api.auth.authenticateUser({ platform, code });

      res.cookie("accessToken", tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      res.cookie("userId", tokens.userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      let path = null;
      let fullPath = null;

      if (actionType === "import") {
        path = constructURL({ routeId: routeIds.importReview });
        fullPath = `${path}?importLink=${importLink}`;
      } else {
        path = constructURL({ routeId: routeIds.exportCreatePlaylist });
        fullPath = `${path}?exportId=${exportId}&platform=${platform}`;
      }

      res.status(200).redirect(fullPath);
    } catch (error) {
      console.error(error);
      const { response } = error as AxiosError;

      res.status(response?.status || 500).send(response?.data);
    }
  },
);

export default routes;
