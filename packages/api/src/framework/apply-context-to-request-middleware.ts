import type { RequestHandler } from "express";

import { createContext } from "./create-context";

export default (function applyContextToRequestMiddleware(
  req,
  _res,
  next,
): void {
  req.ctx = {
    ...createContext(),
  };

  next();
} as RequestHandler);
