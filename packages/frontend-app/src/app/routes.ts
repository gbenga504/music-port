import loadable from "@loadable/component";

import type { RouteObjectWithLoadData } from "react-router-dom";
import type { ILoadableComponentProps } from "../utils/route-utils";

import {
  loadData as homeLoadData,
  IPageQuery as IHomePageQuery,
} from "./pages/Home/loadData";
import {
  loadData as communityLoadData,
  IPageQuery as ICommunityPageQuery,
} from "./pages/Community/loadData";

export const routeIds = {
  home: "home",
  community: "community",
};

const routes: RouteObjectWithLoadData[] = [
  {
    id: routeIds.home,
    path: "/",
    component: loadable<ILoadableComponentProps<unknown, IHomePageQuery>>(
      () => import("./pages/Home"),
    ),
    loadData: homeLoadData,
  },
  {
    id: routeIds.community,
    path: "/community",
    component: loadable<
      ILoadableComponentProps<
        Awaited<ReturnType<typeof communityLoadData>>,
        ICommunityPageQuery
      >
    >(() => import("./pages/Community")),
    loadData: communityLoadData,
  },
];

export default routes;
