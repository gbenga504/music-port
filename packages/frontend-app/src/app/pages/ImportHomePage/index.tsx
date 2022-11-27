import React from "react";

import { HeadMarkup } from "../../components/HeadMarkup";
import { AppHeader } from "../../components/AppHeader";
import { ILoadableComponentProps } from "../../utils/routeUtils";

const ImportHomePage: React.FC<ILoadableComponentProps> = () => {
  return (
    <div>
      <HeadMarkup
        title="Import HomePage"
        description="Import your music from a range of music streaming platforms"
      />
      <AppHeader progressBar={{ value: 10 }} />
    </div>
  );
};

export default ImportHomePage;
