import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import type { ILoadableComponentProps } from "../../../utils/routeUtils";

import { doesPathMatch } from "../../../utils/routeUtils";
import { AppHeader } from "../../components/AppHeader";
import { Container } from "../../components/Container";
import { HeadMarkup } from "../../components/HeadMarkup";
import { routeIds } from "../../routes";

const ExportHomePage: React.FC<ILoadableComponentProps> = () => {
  const [progressBarValue, setProgressBarValue] = useState(10);
  const { pathname } = useLocation();

  useEffect(() => {
    let result = 100;

    const doesPathMatchPasteLink = doesPathMatch({
      routeId: routeIds.exportPasteLink,
      pathname,
    });

    const doesPathMatchReview = doesPathMatch({
      routeId: routeIds.exportReview,
      pathname,
    });

    if (doesPathMatchPasteLink) {
      result = 10;
    }

    if (doesPathMatchReview) {
      result = 47;
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
