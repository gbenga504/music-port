import loadable from "@loadable/component";

import type { RouteObjectWithLoadData } from "react-router-dom";
import type { ILoadableComponentProps } from "./utils/routeUtils";

const routes: RouteObjectWithLoadData[] = [
  {
    id: "home",
    path: "/",
    component: loadable<ILoadableComponentProps>(
      () => import("./pages/ImportHomePage"),
    ),
  },
];

export default routes;
