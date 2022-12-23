import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import type { ILoadableComponentProps } from "../../../utils/routeUtils";

import { HeadMarkup } from "../../components/HeadMarkup";
import { AppHeader } from "../../components/AppHeader";
import { getPath } from "../../../utils/routeUtils";
import routes, { routeIds } from "../../routes";
import { Container } from "../../components/Container";

const ImportHomePage: React.FC<ILoadableComponentProps> = () => {
  const [progressBarValue, setProgressBarValue] = useState(10);
  const { pathname } = useLocation();

  useEffect(() => {
    let reviewPath = getPath({ routes, routeId: routeIds.importReview });
    let copyExportLinkPath = getPath({
      routes,
      routeId: routeIds.importCopyExportLink,
    });
    let result = 0;

    switch (location.pathname) {
      case reviewPath:
        result = 47;
        break;
      case copyExportLinkPath:
        result = 100;
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
        title="Import HomePage"
        description="Import your music from a range of music streaming platforms"
      />
      <AppHeader
        progressBar={{ value: progressBarValue }}
        showExportButton={true}
      />
      <Container className="mt-6 md:mt-20">
        <Outlet />
      </Container>
    </div>
  );
};

export default ImportHomePage;
