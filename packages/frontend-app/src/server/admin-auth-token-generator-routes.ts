import { Router } from "express";

const routes = Router();

routes.get(
  "/admin-auth-token-generator/:platform(spotify|deezer)",
  async (req, res, _next) => {
    // TODO: Verify a special token to prevent CSRF attacks
    // Also maybe generate a unique token that would be added to the query params
    // and validated in the callback process
    const { platform } = req.params;

    return res.redirect(`/api/auth/${platform}?redirect_uri=null`);
  },
);

export default routes;
