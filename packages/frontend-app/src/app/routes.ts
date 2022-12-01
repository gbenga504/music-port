import loadable from "@loadable/component";

import type { RouteObjectWithLoadData } from "react-router-dom";
import type { ILoadableComponentProps } from "./utils/routeUtils";

const routes: RouteObjectWithLoadData[] = [
  {
    id: "import",
    path: "/",
    component: loadable<ILoadableComponentProps>(
      () => import("./pages/ImportHomePage"),
    ),
    children: [
      {
        id: "import-paste-link",
        index: true,
        component: loadable<ILoadableComponentProps>(
          () => import("./pages/ImportHomePage/PasteLink"),
        ),
      },
      {
        id: "import-review",
        path: "review",
        component: loadable<ILoadableComponentProps>(
          () => import("./pages/ImportHomePage/Review"),
        ),
      },
    ],
  },
];

export default routes;
