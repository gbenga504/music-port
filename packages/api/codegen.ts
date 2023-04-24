import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  documents: undefined,
  generates: {
    "src/graphql/graphql-client.gen.ts": {
      schema: "./src/graphql/graphql.gen.graphql",
      documents: "./src/graphql/queries/*.graphql",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
      hooks: {
        afterOneFileWrite: "prettier --write",
      },
    },
  },
};

export default config;
