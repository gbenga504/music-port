import loadable from "@loadable/component";

import { loadData as communityLoadData } from "./pages/Community/load-data";
import { loadData as discoverLoadData } from "./pages/v2/Discover/load-data";

import type { IPageQuery as ICommunityPageQuery } from "./pages/Community/load-data";
import type { IPageQuery as IDiscoverPageQuery } from "./pages/v2/Discover/load-data";
import type { ILoadableComponentProps } from "../utils/route-utils";
import type { RouteObjectWithLoadData } from "react-router-dom";

export const routeIds = {
  // TODO: Old routes Ids, should be deleted
  home: "home",
  community: "community",

  // New routes Ids
  discover: "discover",
};

const routes: RouteObjectWithLoadData[] = [
  {
    id: routeIds.discover,
    path: "/",
    component: loadable<ILoadableComponentProps<unknown, IDiscoverPageQuery>>(
      () => import("./pages/v2/Discover"),
    ),
    loadData: discoverLoadData,
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
