import loadable from "@loadable/component";

import type { RouteObjectWithLoadData } from "react-router-dom";
import type { ILoadableComponentProps } from "../utils/routeUtils";

import { loadData as homeLoadData } from "./pages/Home/loadData";
import {
  loadData as communityLoadData,
  PageQuery as CommunityPageQuery,
} from "./pages/Community/loadData";

export const routeIds = {
  home: "home",
  community: "community",
};

const routes: RouteObjectWithLoadData[] = [
  {
    id: routeIds.home,
    path: "/",
    component: loadable<ILoadableComponentProps>(() => import("./pages/Home")),
    loadData: homeLoadData,
  },
  {
    id: routeIds.community,
    path: "/community",
    component: loadable<
      ILoadableComponentProps<
        Awaited<ReturnType<typeof communityLoadData>>,
        CommunityPageQuery
      >
    >(() => import("./pages/Community")),
    loadData: communityLoadData,
  },
];

export default routes;
