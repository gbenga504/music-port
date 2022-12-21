import React, { createContext, useContext } from "react";

import { canUseDOM } from "../../utils/dom";
import { createApiClient } from "../api";

import type { ReactNode } from "react";
import type { ICreateApiClient } from "../api";

const getApiClient = (): ICreateApiClient => {
  if (canUseDOM()) {
    return createApiClient({
      backendApiBaseUrl: process.env.API_PROXY,
      frontendApiBaseUrl: "/",
      timeout: 8000,
    });
  }

  return createApiClient({
    backendApiBaseUrl: process.env.BACKEND_API_BASE_URL,
    frontendApiBaseUrl: process.env.FRONTEND_BASE_URL,
  });
};

const ApiContext = createContext<ICreateApiClient>(getApiClient());

export const useApi = () => {
  return useContext(ApiContext);
};

export const ApiProvider: React.FC<{
  children: ReactNode;
  api: ICreateApiClient;
}> = ({ children, api }) => {
  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};
