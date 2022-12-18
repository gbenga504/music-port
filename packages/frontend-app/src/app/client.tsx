import React from "react";
import { hydrateRoot } from "react-dom/client";
import { loadableReady } from "@loadable/component";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { createApiClient } from "./api";
import { IPageDatas } from "../utils/routeUtils";

interface ICallbackProps {
  appData: { pageDatas: IPageDatas };
  api: ReturnType<typeof createApiClient>;
}

function setupClient(callback: (props: ICallbackProps) => void) {
  const appData = JSON.parse(
    document.getElementById("app-data")!.textContent as string
  );

  const api = createApiClient({
    backendApiBaseUrl: process.env.API_PROXY,
    frontendApiBaseUrl: "/",
    timeout: 8000,
  });

  callback({ appData, api });
}

setupClient(({ appData, api }) => {
  loadableReady(() => {
    hydrateRoot(
      document.getElementById("root")!,
      <BrowserRouter>
        <App {...appData} api={api} />
      </BrowserRouter>
    );
  });
});
