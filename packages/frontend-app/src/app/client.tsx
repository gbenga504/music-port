import React from "react";
import { hydrateRoot } from "react-dom/client";
import { loadableReady } from "@loadable/component";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { getApiClient } from "./api";

import type { IPageDatas } from "../utils/routeUtils";
import type { ICreateApiClient } from "./api";

interface ICallbackProps {
  appData: { pageDatas: IPageDatas };
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
        <App {...appData} api={api} />
      </BrowserRouter>
    );
  });
});
