import { GraphQLClient as GraphQLClientFromGraphQLRequest } from "graphql-request";

import { getSdk, Sdk } from "./graphql-client.gen";

export function createGraphQLClient(configuration: {
  url: string;
  headers?: Record<string, string>;
}): Sdk {
  const client = new GraphQLClientFromGraphQLRequest(configuration.url, {
    headers: configuration.headers,
  });

  return getSdk(client);
}

export type { Sdk as GraphQLClient };
