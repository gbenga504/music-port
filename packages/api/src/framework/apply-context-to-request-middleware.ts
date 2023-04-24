import type { RequestHandler } from "express";

import { createContext } from "./create-context";

export default (function applyContextToRequestMiddleware(
  req,
  _res,
  next,
): void {
  const accessToken =
    req.cookies?.accessToken || req.headers["accesstoken"] || null;

  const userId = req.cookies?.userId || req.headers["userid"] || null;

  req.ctx = {
    ...createContext(),
    accessToken,
    userId,
  };

  next();
} as RequestHandler);
