import React, { useRef } from "react";

import type { ILoadableComponentProps } from "../../../utils/routeUtils";

import { Input, InputGroup, InputRightElement } from "../../components/Input";
import { Button } from "../../components/Button";
import { useLocation } from "react-router-dom";
import { useToast } from "../../components/Toast/ToastContext";

const CopyExportLink: React.FC<ILoadableComponentProps> = () => {
  const { search } = useLocation();
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = new URLSearchParams(search);
  const exportId = searchParams.get("exportId");
  const exportLink = `${process.env.FRONTEND_BASE_URL}/export/${exportId}`;

  const handleCopyToClipboard = async (): Promise<void> => {
    inputRef.current!.select();

    // For mobile devices
    inputRef.current!.setSelectionRange(0, 99999);

    // Copy the text inside the text field
    navigator.clipboard.writeText(inputRef.current!.value);

    toast({
      title: "Link copied to cliboard!",
      status: "info",
    });
  };

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
          <Input
            fullWidth
            size="large"
            className="pr-24"
            value={exportLink}
            disabled
            ref={inputRef}
          />
          <InputRightElement className="w-24">
            <Button
              size="large"
              variant="contained"
              onClick={handleCopyToClipboard}
            >
              Copy
            </Button>
          </InputRightElement>
        </InputGroup>
      </div>
    </div>
  );
};

export default CopyExportLink;
