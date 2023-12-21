import loadable from "@loadable/component";

import { loadData as communityLoadData } from "./pages/Community/load-data";
import { loadData as discoverPageLoadData } from "./pages/v2/DiscoverPage/load-data";

import type { IPageQuery as ICommunityPageQuery } from "./pages/Community/load-data";
import type {
  IPageQuery as IDiscoverPageQuery,
  PageData,
} from "./pages/v2/DiscoverPage/load-data";
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
    component: loadable<ILoadableComponentProps<PageData, IDiscoverPageQuery>>(
      () => import("./pages/v2/DiscoverPage/DiscoverPage"),
    ),
    loadData: discoverPageLoadData,
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
