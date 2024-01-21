import { createContext, useContext } from "react";
import React from "react";

import type { IGlobalPageData } from "../../utils/route-utils";
import type { ReactNode } from "react";

const GlobalPageDataContext = createContext<IGlobalPageData>({ genres: [] });

export const useGlobalPageData = () => {
  return useContext(GlobalPageDataContext);
};

export const GlobalPageDataProvider: React.FC<{
  children: ReactNode;
  globalPageData: IGlobalPageData;
}> = ({ children, globalPageData }) => {
  return (
    <GlobalPageDataContext.Provider value={globalPageData}>
      {children}
    </GlobalPageDataContext.Provider>
  );
};
