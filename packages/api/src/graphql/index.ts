import { join } from "node:path";

import { graphqlHTTP } from "express-graphql";
import {
  makeSchema,
  fieldAuthorizePlugin,
  connectionPlugin,
  nullabilityGuardPlugin,
} from "nexus";

import { createGraphQLContext } from "./create-graphql-context";
import { GQLDate } from "./scalars/date-scalar";

//@ts-expect-error prettier config is a JS file not TS but still we want use the import statement
import prettierrc from "../../.prettierrc";
import { UnauthorizedError } from "../errors/unauthorized-error";
import * as Playlist from "../playlist/graphql";

import type { Request } from "express";

const schema = makeSchema({
  types: [
    // Scalars
    GQLDate,

    Playlist,
  ],
  outputs: {
    schema: join(__dirname, "graphql.gen.graphql"),
    typegen: join(__dirname, "graphql.gen.ts"),
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
    module: join(
      __dirname,
      process.env.NODE_ENV === "production"
        ? "graphql-context-type.js"
        : "graphql-context-type.ts",
    ),
    export: "GraphQLContextType",
  },
  prettierConfig: prettierrc,
  nonNullDefaults: { output: true, input: true },
});

export function applyMiddleware() {
  return graphqlHTTP(function (req, _res) {
    return {
      schema,
      graphiql: {
        headerEditorEnabled: true,
      },
      context: createGraphQLContext(req as Request),
    };
  });
}
