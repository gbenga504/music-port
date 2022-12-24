import React from "react";

import type { ILoadableComponentProps } from "../../../utils/routeUtils";

import { Button } from "../../components/Button";
import { PageLayout } from "../../components/PageLayout";

const CreatePlaylist: React.FC<ILoadableComponentProps> = () => {
  return (
    <PageLayout
      title="Create Playlist"
      description="We will now create a playlist for you on your selected music streaming platform"
    >
      <Button
        loading
        disabled
        fullWidth
        size="x-large"
        loadingText="Exporting playlist..."
      />
    </PageLayout>
  );
};

export default CreatePlaylist;
