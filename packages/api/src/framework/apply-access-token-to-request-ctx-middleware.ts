import type { RequestHandler } from "express";

export default (function applyAccessTokenToRequestCtxMiddlewware(
  req,
  _res,
  next,
): void {
  const accessToken = req.cookies?.accessToken || null;

  req.ctx = {
    ...req.ctx,
    accessToken,
  };

  next();
} as RequestHandler);
