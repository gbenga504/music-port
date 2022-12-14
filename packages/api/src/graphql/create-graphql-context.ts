import type { Request } from "express";
import type { GraphQLContextType } from "./graphql-context-type";

export function createGraphQLContext(req: Request): GraphQLContextType {
  return {
    ...req.ctx,
  };
}
