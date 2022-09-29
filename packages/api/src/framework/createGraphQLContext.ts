import type { Request } from "express";
import type { createContext } from "./createContext";

type CreateGraphQLContextType = ReturnType<typeof createContext>;

export function createGraphQLContext(req: Request): CreateGraphQLContextType {
  return {
    ...req.ctx,
  };
}
