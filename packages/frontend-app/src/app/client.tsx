import React from "react";
import { hydrateRoot } from "react-dom/client";
import { loadableReady } from "@loadable/component";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { IPageDatas } from "./utils/routeUtils";

interface ICallbackProps {
  appData: { pageDatas: IPageDatas };
}

function setupClient(callback: (props: ICallbackProps) => void) {
  const appData = JSON.parse(
    document.getElementById("app-data")!.textContent as string
  );

  callback({ appData });
}

setupClient(({ appData }) => {
  loadableReady(() => {
    hydrateRoot(
      document.getElementById("root") as HTMLElement,
      <BrowserRouter>
        <App {...appData} />
      </BrowserRouter>
    );
  });
});
