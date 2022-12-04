import { join } from "node:path";
import type { Request } from "express";
import { graphqlHTTP } from "express-graphql";
import {
  makeSchema,
  fieldAuthorizePlugin,
  connectionPlugin,
  nullabilityGuardPlugin,
} from "nexus";
import { createGraphQLContext } from "../framework/create-graphql-context";
import { UnauthorizedError } from "../errors/unauthorized-error";

const schema = makeSchema({
  types: [],
  outputs: {
    schema: join(__dirname, "nexus.gen.graphql"),
    typegen: join(__dirname, "nexus.gen.ts"),
  },
  plugins: [
    fieldAuthorizePlugin({
      formatError: () => new UnauthorizedError({ message: "not authorized" }),
    }),
    connectionPlugin(),
    nullabilityGuardPlugin({
      onGuarded({ info }) {
        // TODO: Report this is an error management system
        console.error(`
          Error: Saw a null value for non-null field ${info.parentType.name}.${info.fieldName}
        `);
      },
      fallbackValues: {
        Int: () => 0,
        String: () => "",
        ID: ({ info }) => `${info.parentType.name}:N/A`,
        Boolean: () => false,
        Float: () => 0,
      },
    }),
  ],
  sourceTypes: {
    headers: ["// @ts-nocheck"],
    modules: [],
  },
  contextType: {
    module: join(__dirname, "../types", "graphql-context-type.ts"),
    export: "GraphQLContextType",
  },
  prettierConfig: require.resolve("../../.prettierrc"),
  nonNullDefaults: { output: true, input: true },
});

export function applyMiddleware() {
  return graphqlHTTP(function (req, _res) {
    return {
      schema,
      graphiql: true,
      context: createGraphQLContext(req as Request),
    };
  });
}
