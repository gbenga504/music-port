import React from "react";
import { hydrateRoot } from "react-dom/client";
import { loadableReady } from "@loadable/component";

import App from "./App";

loadableReady(() => {
  hydrateRoot(document.getElementById("root") as HTMLElement, <App />);
});
