import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  documents: undefined,
  generates: {
    "src/app/api/graphql/graphql-client.gen.ts": {
      schema: "http://localhost:9999/api/graphql",
      documents: "./src/app/api/graphql/queries/*.ts",
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
