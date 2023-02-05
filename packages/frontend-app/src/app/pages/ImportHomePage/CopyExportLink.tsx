import React, { useRef } from "react";

import type { ILoadableComponentProps } from "../../../utils/routeUtils";

import { Input, InputGroup, InputRightElement } from "../../components/Input";
import { Button } from "../../components/Button";
import { useLocation } from "react-router-dom";
import { useToast } from "../../components/Toast/ToastContext";
import { constructURL } from "../../../utils/url";
import { routeIds } from "../../routes";
import { PageLayout } from "../../components/PageLayout";

const CopyExportLink: React.FC<ILoadableComponentProps> = () => {
  const { search } = useLocation();
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = new URLSearchParams(search);
  const exportId = searchParams.get("exportId");
  const exportLink = `${process.env.SITE_ORIGIN}/export/${exportId}`;

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
    <PageLayout
      title="Copy and send this link"
      description="You can now send this link to anyone who wishes to have what you are
    listening to"
    >
      <div className="grid grid-rows-[repeat(2,_max-content)] gap-y-4">
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

        <Button
          size="large"
          variant="text"
          className="justify-end"
          to={constructURL({ routeId: routeIds.importPasteLink })}
        >
          Want to import another playlist?
        </Button>
      </div>
    </PageLayout>
  );
};

export default CopyExportLink;
