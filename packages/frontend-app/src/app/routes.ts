import loadable from "@loadable/component";

import { loadData as discoverPageLoadData } from "./pages/v2/DiscoverPage/load-data";
import { loadData as genrePageLoadData } from "./pages/v2/GenrePage/load-data";

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

export const ROUTE_IDS = {
  discoverPage: "discoverPage",
  genrePage: "genrePage",
} as const;

const routes: RouteObjectWithLoadData[] = [
  {
    id: ROUTE_IDS.discoverPage,
    path: "/",
    component: loadable<
      ILoadableComponentProps<DiscoverPageData, IDiscoverPageQuery>
    >(() => import("./pages/v2/DiscoverPage/DiscoverPage")),
    loadData: discoverPageLoadData,
  },
  {
    id: ROUTE_IDS.genrePage,
    path: "/genre/:genre",
    component: loadable<
      ILoadableComponentProps<GenrePageData, unknown, IGenrePageParams>
    >(() => import("./pages/v2/GenrePage/GenrePage")),
    loadData: genrePageLoadData,
  },
];

export default routes;
