import { join } from "node:path";
import path from "node:path";
import { fileURLToPath } from "url";
import type { Request } from "express";
import { graphqlHTTP } from "express-graphql";
import nexus from "nexus";
import { createGraphQLContext } from "./create-graphql-context";
import { UnauthorizedError } from "../errors/unauthorized-error";

import * as Playlist from "../playlist/graphql";
// @ts-ignore
import prettierrc from "../../.prettierrc";

const {
  makeSchema,
  fieldAuthorizePlugin,
  connectionPlugin,
  nullabilityGuardPlugin,
} = nexus;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schema = makeSchema({
  types: [Playlist],
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
    module: join(__dirname, "graphql-context-type.ts"),
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
