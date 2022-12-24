import loadable from "@loadable/component";

import type { RouteObjectWithLoadData } from "react-router-dom";
import type { ILoadableComponentProps } from "../utils/routeUtils";

export const routeIds = {
  import: "import",
  importPasteLink: "importPasteLink",
  importReview: "importReview",
  importCopyExportLink: "importCopyExportLink",
  export: "export",
  exportPasteLink: "exportPasteLink",
  exportReview: "exportReview",
};

const routes: RouteObjectWithLoadData[] = [
  {
    id: routeIds.import,
    path: "/",
    component: loadable<ILoadableComponentProps>(
      () => import("./pages/ImportHomePage"),
    ),
    children: [
      {
        id: routeIds.importPasteLink,
        path: "/",
        index: true,
        component: loadable<ILoadableComponentProps>(
          () => import("./pages/ImportHomePage/PasteLink"),
        ),
      },
      {
        id: routeIds.importReview,
        path: "/review",
        component: loadable<ILoadableComponentProps>(
          () => import("./pages/ImportHomePage/Review"),
        ),
      },
      {
        id: routeIds.importCopyExportLink,
        path: "/copy-export-link",
        component: loadable<ILoadableComponentProps>(
          () => import("./pages/ImportHomePage/CopyExportLink"),
        ),
      },
    ],
  },
  {
    id: routeIds.export,
    path: "/export",
    component: loadable<ILoadableComponentProps>(
      () => import("./pages/ExportHomePage"),
    ),
    children: [
      {
        id: routeIds.exportPasteLink,
        path: "/export",
        index: true,
        component: loadable<ILoadableComponentProps>(
          () => import("./pages/ExportHomePage/PasteLink"),
        ),
      },
      {
        id: routeIds.exportReview,
        path: "/export/:id",
        index: true,
        component: loadable<ILoadableComponentProps>(
          () => import("./pages/ExportHomePage/Review/index"),
        ),
      },
    ],
  },
];

export default routes;
