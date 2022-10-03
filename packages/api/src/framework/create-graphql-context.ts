import type { Request } from "express";
import type { createContext } from "./create-context";

type CreateGraphQLContextType = ReturnType<typeof createContext>;

export function createGraphQLContext(req: Request): CreateGraphQLContextType {
  return {
    ...req.ctx,
  };
}
