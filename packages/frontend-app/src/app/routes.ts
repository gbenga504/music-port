import loadable from "@loadable/component";

import type { RouteObjectWithLoadData } from "react-router-dom";
import type { ILoadableComponentProps } from "./utils/routeUtils";

export const routeIds = {
  import: "import",
  importPasteLink: "importPasteLink",
  importReview: "importReview",
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
    ],
  },
];

export default routes;
