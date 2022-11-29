import React from "react";
import { Outlet } from "react-router-dom";

import { HeadMarkup } from "../../components/HeadMarkup";
import { AppHeader } from "../../components/AppHeader";

import type { ILoadableComponentProps } from "../../utils/routeUtils";

const ImportHomePage: React.FC<ILoadableComponentProps> = () => {
  return (
    <div>
      <HeadMarkup
        title="Import HomePage"
        description="Import your music from a range of music streaming platforms"
      />
      <AppHeader progressBar={{ value: 10 }} showExportButton={true} />
      <div className="w-3/4 m-auto mt-20">
        <Outlet />
      </div>
    </div>
  );
};

export default ImportHomePage;
