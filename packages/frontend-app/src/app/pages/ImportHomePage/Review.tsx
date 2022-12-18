import React from "react";

import { Button } from "../../components/Button";

import type { ILoadableComponentProps } from "../../../utils/routeUtils";

const Review: React.FC<ILoadableComponentProps> = () => {
  return (
    <div className="flex justify-between">
      <div className="w-2/5">
        <h4 className="font-medium text-5xl text-title">
          Review the contents of your playlist
        </h4>
        <p className="mt-8 block">
          You can review the contents of your playlist before we generate an
          export link
        </p>
      </div>
      <div className="w-2/4">
        <Button
          disabled
          loading
          fullWidth
          size="x-large"
          loadingText="Generating export link..."
        />
      </div>
    </div>
  );
};

export default Review;
