import loadable from "@loadable/component";

import { loadData as discoverPageLoadData } from "./pages/v2/DiscoverPage/load-data";
import { loadData as genrePageLoadData } from "./pages/v2/GenrePage/load-data";
import { loadData as playlistDetailsPageLoadData } from "./pages/v2/PlaylistDetailsPage/load-data";

import type {
  IPageQuery as IDiscoverPageQuery,
  PageData as DiscoverPageData,
} from "./pages/v2/DiscoverPage/load-data";
import type {
  IPageParams as IGenrePageParams,
  PageData as GenrePageData,
} from "./pages/v2/GenrePage/load-data";
import type {
  IPageParams as IPlaylistDetailsParams,
  PageData as PlaylistDetailsPageData,
} from "./pages/v2/PlaylistDetailsPage/load-data";
import type { ILoadableComponentProps } from "../utils/route-utils";
import type { RouteObjectWithLoadData } from "react-router-dom";

export const ROUTE_IDS = {
  discoverPage: "discoverPage",
  genrePage: "genrePage",
  playlistDetailsPage: "playlistDetailsPage",
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
  {
    id: ROUTE_IDS.playlistDetailsPage,
    path: "/playlists/:id",
    component: loadable<
      ILoadableComponentProps<
        PlaylistDetailsPageData,
        unknown,
        IPlaylistDetailsParams
      >
    >(() => import("./pages/v2/PlaylistDetailsPage/PlaylistDetailsPage")),
    loadData: playlistDetailsPageLoadData,
  },
];

export default routes;
