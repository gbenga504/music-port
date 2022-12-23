import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import type { ILoadableComponentProps } from "../../../utils/routeUtils";

import { getPath } from "../../../utils/routeUtils";
import { AppHeader } from "../../components/AppHeader";
import { Container } from "../../components/Container";
import { HeadMarkup } from "../../components/HeadMarkup";
import routes, { routeIds } from "../../routes";

const ExportHomePage: React.FC<ILoadableComponentProps> = () => {
  const [progressBarValue, setProgressBarValue] = useState(10);
  const { pathname } = useLocation();

  useEffect(() => {
    let exportPasteLinkPath = getPath({
      routes,
      routeId: routeIds.exportPasteLink,
    });
    let result = 0;

    switch (location.pathname) {
      case exportPasteLinkPath:
        result = 47;
        break;
      default:
        result = 10;
        break;
    }

    setProgressBarValue(result);
  }, [pathname]);

  return (
    <div>
      <HeadMarkup
        title="Export HomePage"
        description="Export a playlist and play on your favourite streaming platform"
      />
      <AppHeader
        progressBar={{ value: progressBarValue }}
        showImportButton={true}
      />
      <Container className="mt-6 md:mt-20">
        <Outlet />
      </Container>
    </div>
  );
};

export default ExportHomePage;
