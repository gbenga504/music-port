import loadable from "@loadable/component";

import type { RouteObjectWithLoadData } from "react-router-dom";
import type { ILoadableComponentProps } from "./utils/routeUtils";

import { loadData as HomeLoadData } from "./pages/ImportHomePage/loadData";

const routes: RouteObjectWithLoadData[] = [
  {
    id: "home",
    path: "/",
    component: loadable<ILoadableComponentProps>(
      () => import("./pages/ImportHomePage"),
    ),
    loadData: HomeLoadData,
  },
];

export default routes;
