import loadable from "@loadable/component";

import type { RouteObjectWithLoadData } from "react-router-dom";
import type { ILoadableComponentProps } from "./utils/routeUtils";

import { loadData as HomeLoadData } from "./pages/Home/loadData";

const routes: RouteObjectWithLoadData[] = [
  {
    id: "home",
    path: "/",
    component: loadable<ILoadableComponentProps>(() => import("./pages/Home")),
    loadData: HomeLoadData,
  },
];

export default routes;
