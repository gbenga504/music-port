import React from "react";

import { Button } from "../../components/Button";
import { Space } from "../../components/Space";
import {
  ProgressBar,
  IProps as IProgressBarProps,
} from "../../components/ProgressBar";
import { constructURL } from "../../../utils/url";
import { routeIds } from "../../routes";

interface IProps {
  progressBar: IProgressBarProps;
  showExportButton?: boolean;
  showImportButton?: boolean;
}

export const AppHeader: React.FC<IProps> = ({
  progressBar,
  showExportButton,
  showImportButton,
}) => {
  const exportLink = constructURL({ routeId: routeIds.exportPasteLink });
  const importLink = constructURL({ routeId: routeIds.importPasteLink });

  return (
    <div className="w-full">
      <nav className="w-11/12 md:w-4/5 m-auto flex justify-between items-center h-24">
        <div />
        <Space size="large">
          <Button variant="text" size="medium">
            Feedback
          </Button>
          <Button variant="text" size="medium" href="#">
            Github
          </Button>
          {showExportButton && (
            <Button variant="contained" size="medium" to={exportLink}>
              Export
            </Button>
          )}
          {showImportButton && (
            <Button variant="contained" size="medium" to={importLink}>
              Import
            </Button>
          )}
        </Space>
      </nav>
      <ProgressBar {...progressBar} />
    </div>
  );
};
