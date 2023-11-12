import type { GraphQLContextType } from "./graphql-context-type";
import type { Request } from "express";

export function createGraphQLContext(req: Request): GraphQLContextType {
  return {
    ...req.ctx,
  };
}
