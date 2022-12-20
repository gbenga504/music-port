import React, { createContext, useContext } from "react";

import { canUseDOM } from "../../utils/dom";
import { createApiClient } from "../api";

import type { ReactNode } from "react";

type IContextValue = ReturnType<typeof createApiClient>;

const getApiClient = (): ReturnType<typeof createApiClient> => {
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

const ApiContext = createContext<IContextValue>(getApiClient());

export const useApi = () => {
  return useContext(ApiContext);
};

export const ApiProvider: React.FC<{
  children: ReactNode;
  api: ReturnType<typeof createApiClient>;
}> = ({ children, api }) => {
  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};
