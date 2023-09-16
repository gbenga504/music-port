import React, { createContext, useContext } from "react";

import { getApiClient } from "../api";

import type { ICreateApiClient } from "../api";
import type { ReactNode } from "react";

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
