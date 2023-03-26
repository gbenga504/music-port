import loadable from "@loadable/component";

import type { RouteObjectWithLoadData } from "react-router-dom";
import type { ILoadableComponentProps } from "../utils/routeUtils";

import { loadData as homeLoadData } from "./pages/Home/loadData";

export const routeIds = {
  // old route Ids. Should be deleted
  import: "import",
  importPasteLink: "importPasteLink",
  importReview: "importReview",
  importCopyExportLink: "importCopyExportLink",
  export: "export",
  exportPasteLink: "exportPasteLink",
  exportReview: "exportReview",
  exportCreatePlaylist: "exportCreatePlaylist",

  // New route Ids
  home: "home",
};

const routes: RouteObjectWithLoadData[] = [
  {
    id: routeIds.home,
    path: "/",
    component: loadable<ILoadableComponentProps>(() => import("./pages/Home")),
    loadData: homeLoadData,
  },
];

export default routes;
