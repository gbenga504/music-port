import axios from "axios";

import { auth } from "./auth";

interface ICreateApiClientParams {
  backendApiBaseUrl?: string;
  frontendApiBaseUrl?: string;
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

  return {
    auth: auth({ httpClientForBackend, httpClientForFrontend }),
  };
};
