import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import type { ILoadableComponentProps } from "../../../utils/routeUtils";

import { doesPathMatch } from "../../../utils/routeUtils";
import { HeadMarkup } from "../../components/HeadMarkup";
import { AppHeader } from "../../components/AppHeader";
import { routeIds } from "../../routes";
import { Container } from "../../components/Container";

const ImportHomePage: React.FC<ILoadableComponentProps> = () => {
  const [progressBarValue, setProgressBarValue] = useState(10);
  const { pathname } = useLocation();

  useEffect(() => {
    let result = 100;

    const doesPathMatchPasteLink = doesPathMatch({
      routeId: routeIds.importPasteLink,
      pathname,
    });

    const doesPathMatchReview = doesPathMatch({
      routeId: routeIds.importReview,
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
