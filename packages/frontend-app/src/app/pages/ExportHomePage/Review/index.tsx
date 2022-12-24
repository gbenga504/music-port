import React from "react";

import { ILoadableComponentProps } from "../../../../utils/routeUtils";
import { PageLayout } from "../../../components/PageLayout";

const Review: React.FC<ILoadableComponentProps> = () => {
  return (
    <PageLayout
      title="Review your playlist before exporting"
      description="Please review the information of the playlist you want to export. Thereafter, select a platform to export the playlist into."
    >
      Nothing to see here
    </PageLayout>
  );
};

export default Review;
