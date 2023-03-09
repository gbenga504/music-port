import type { AxiosInstance } from "axios";
import type { GraphQLClient } from "./graphql/graphql-client";

export interface IBaseClientParams {
  httpClientForBackend: AxiosInstance;
  httpClientForFrontend: AxiosInstance;
  graphQLClient: GraphQLClient;
}
