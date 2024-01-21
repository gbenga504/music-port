import { loadableReady } from "@loadable/component";
import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { ErrorBoundary } from "./ErrorBoundary";
import { getApiClient } from "./api";

import type { ICreateApiClient } from "./api";
import type { IGlobalPageData, IPageDatas } from "../utils/route-utils";

interface ICallbackProps {
  // TODO: Type error properly. Error is a stringified object
  // on client side and an actual error object on server side
  // so there is a type mismatch during rehydration
  appData: {
    pageDatas: IPageDatas;
    globalPageData: IGlobalPageData;
    error?: any;
  };
  api: ICreateApiClient;
}

function setupClient(callback: (props: ICallbackProps) => void) {
  const appData = JSON.parse(
    document.getElementById("app-data")!.textContent as string
  );

  callback({ appData, api: getApiClient() });
}

setupClient(({ appData, api }) => {
  loadableReady(() => {
    hydrateRoot(
      document.getElementById("root")!,
      <BrowserRouter>
        <ErrorBoundary error={appData.error}>
          <App {...appData} api={api} />
        </ErrorBoundary>
      </BrowserRouter>
    );
  });
});
