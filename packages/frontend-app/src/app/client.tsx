import React from "react";
import { hydrateRoot } from "react-dom/client";
import { loadableReady } from "@loadable/component";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

loadableReady(() => {
  hydrateRoot(
    document.getElementById("root") as HTMLElement,
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});
