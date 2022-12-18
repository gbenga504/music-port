import React from "react";

import type { ILoadableComponentProps } from "../../../utils/routeUtils";

import { Input, InputGroup, InputRightElement } from "../../components/Input";
import { Button } from "../../components/Button";

const CopyExportLink: React.FC<ILoadableComponentProps> = () => {
  return (
    <div className="flex justify-between">
      <div className="w-2/5">
        <h4 className="font-medium text-5xl text-title">
          Copy and send this link
        </h4>
        <p className="mt-8 block">
          You can now send this link to anyone who wishes to have what you are
          listening to
        </p>
      </div>
      <div className="w-2/4">
        <InputGroup>
          <Input fullWidth size="large" className="pr-24" disabled />
          <InputRightElement className="w-24">
            <Button size="large" variant="contained">
              Copy
            </Button>
          </InputRightElement>
        </InputGroup>
      </div>
    </div>
  );
};

export default CopyExportLink;
