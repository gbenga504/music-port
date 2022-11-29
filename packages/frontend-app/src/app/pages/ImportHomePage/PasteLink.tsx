import React from "react";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import type { ILoadableComponentProps } from "../../utils/routeUtils";

const PasteLink: React.FC<ILoadableComponentProps> = () => {
  return (
    <div className="flex justify-between">
      <div className="w-2/5">
        <h4 className="font-medium text-5xl text-title">
          Paste a link from your streaming provider
        </h4>
        <p className="mt-8 block">
          We will use the link to generate an export link that can be shared.
        </p>
      </div>
      <div className="w-2/4">
        <form>
          <Input placeholder="Enter a streaming link" size="large" fullWidth />
          <div className="mt-12">
            <Button variant="contained" size="large" htmlType="submit">
              Import
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasteLink;
