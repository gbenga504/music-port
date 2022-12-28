import type { RequestHandler } from "express";

export default (function applyUserToRequestCtxMiddlewware(
  req,
  _res,
  next,
): void {
  const accessToken =
    req.cookies?.accessToken || req.headers["accesstoken"] || null;

  const userId = req.cookies?.userId || req.headers["userid"] || null;

  req.ctx = {
    ...req.ctx,
    accessToken,
    userId,
  };

  next();
} as RequestHandler);
