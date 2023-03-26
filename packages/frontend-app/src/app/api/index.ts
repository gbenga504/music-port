import axios from "axios";

import { Auth } from "./auth";
import { Playlist } from "./playlist";
import { isDOM } from "../../utils/dom";
import { createGraphQLClient } from "./graphql/graphql-client";

interface ICreateApiClientParams {
  backendApiBaseUrl: string;
  frontendApiBaseUrl: string;
  timeout?: number;
}

export const createApiClient = ({
  backendApiBaseUrl,
  frontendApiBaseUrl,
  timeout,
}: ICreateApiClientParams) => {
  const headers = {};

  const httpClientForBackend = axios.create({
    baseURL: backendApiBaseUrl,
    timeout,
    headers,
  });

  const httpClientForFrontend = axios.create({
    baseURL: frontendApiBaseUrl,
    timeout,
    headers,
  });

  const graphQLClient = createGraphQLClient({
    url: backendApiBaseUrl,
    headers,
  });

  const auth = new Auth({
    httpClientForBackend,
    httpClientForFrontend,
    graphQLClient,
  });
  const playlist = new Playlist({
    httpClientForBackend,
    httpClientForFrontend,
    graphQLClient,
  });

  return {
    auth,
    playlist,
  };
};

export type ICreateApiClient = ReturnType<typeof createApiClient>;

export const getApiClient = (): ICreateApiClient => {
  if (isDOM) {
    return createApiClient({
      backendApiBaseUrl: process.env.API_PROXY!,
      frontendApiBaseUrl: "/",
      timeout: 8000,
    });
  }

  return createApiClient({
    backendApiBaseUrl: process.env.BACKEND_API_BASE_URL!,
    frontendApiBaseUrl: process.env.FRONTEND_BASE_URL!,
  });
};
