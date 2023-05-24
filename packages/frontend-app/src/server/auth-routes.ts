import { AxiosError } from "axios";
import { Router } from "express";

const routes = Router();

routes.get(
  "/auth/:platform(spotify|deezer|youtubeMusic)/callback",
  async (req, res, _next) => {
    const { state, code } = req.query as { code: string; state: string };
    const { platform } = req.params;

    try {
      const { redirect_uri } = JSON.parse(
        Buffer.from(state, "base64").toString(),
      );

      const tokens = await req.api.auth.authenticateUser({
        platform,
        code,
        fromAdminAuthTokenGenerator: redirect_uri === "null",
      });

      if (redirect_uri === "null") {
        res.status(200).send("Token generated");
        return;
      }

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

      res.status(200).redirect(decodeURIComponent(redirect_uri));
    } catch (error) {
      console.error(error);
      const { response } = error as AxiosError;

      res.status(response?.status || 500).send(response?.data);
    }
  },
);

export default routes;
