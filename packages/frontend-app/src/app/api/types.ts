import type { GraphQLClient } from "./graphql/graphql-client";
import type { AxiosInstance } from "axios";

export interface IBaseClientParams {
  httpClientForBackend: AxiosInstance;
  httpClientForFrontend: AxiosInstance;
  graphQLClient: GraphQLClient;
}
