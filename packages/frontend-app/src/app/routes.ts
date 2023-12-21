import loadable from "@loadable/component";

import { loadData as communityLoadData } from "./pages/Community/load-data";
import { loadData as discoverPageLoadData } from "./pages/v2/DiscoverPage/load-data";
import { loadData as genrePageLoadData } from "./pages/v2/GenrePage/load-data";

import type { IPageQuery as ICommunityPageQuery } from "./pages/Community/load-data";
import type {
  IPageQuery as IDiscoverPageQuery,
  PageData as DiscoverPageData,
} from "./pages/v2/DiscoverPage/load-data";
import type {
  IPageParams as IGenrePageParams,
  PageData as GenrePageData,
} from "./pages/v2/GenrePage/load-data";
import type { ILoadableComponentProps } from "../utils/route-utils";
import type { RouteObjectWithLoadData } from "react-router-dom";

export const routeIds = {
  // TODO: Old routes Ids, should be deleted
  home: "home",
  community: "community",

  // New routes Ids
  discoverPage: "discoverPage",
  genrePage: "genrePage",
} as const;

const routes: RouteObjectWithLoadData[] = [
  {
    id: routeIds.discoverPage,
    path: "/",
    component: loadable<
      ILoadableComponentProps<DiscoverPageData, IDiscoverPageQuery>
    >(() => import("./pages/v2/DiscoverPage/DiscoverPage")),
    loadData: discoverPageLoadData,
  },
  {
    id: routeIds.genrePage,
    path: "/genre/:genre",
    component: loadable<
      ILoadableComponentProps<GenrePageData, unknown, IGenrePageParams>
    >(() => import("./pages/v2/GenrePage/GenrePage")),
    loadData: genrePageLoadData,
  },

  // TODO: Old routes Ids, should be deleted
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
