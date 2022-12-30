import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "../../components/Button";
import { useApi } from "../../context/ApiContext";
import { useToast } from "../../components/Toast/ToastContext";
import { constructURL } from "../../../utils/url";
import { routeIds } from "../../routes";
import { PageLayout } from "../../components/PageLayout";

import type { ILoadableComponentProps } from "../../../utils/routeUtils";

const Review: React.FC<ILoadableComponentProps> = () => {
  const { search } = useLocation();
  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "loading"
  );
  const api = useApi();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      setStatus("loading");
      const searchParams = new URLSearchParams(search);
      const importLink = searchParams.get("importLink");

      if (!importLink) {
        return toast({
          description: "Import link must be provided",
          status: "error",
        });
      }

      const result = await api.playlist.importPlaylist({
        importLink: importLink!,
      });

      if (!result.success) {
        setStatus("error");
        return toast({
          title: result.error.name,
          description: result.error.message,
          status: "error",
        });
      }

      setStatus("success");
      navigate(
        constructURL({
          routeId: routeIds.importCopyExportLink,
          query: { exportId: result.data.exportId },
        }),
        {
          replace: true,
        }
      );
    })();
  }, []);

  const handleTryAgain = (): void => {
    navigate(
      constructURL({
        routeId: routeIds.importPasteLink,
      })
    );
  };

  return (
    <PageLayout
      title="Review the contents of your playlist"
      description="You can review the contents of your playlist before we generate an
    export link."
    >
      <Button
        disabled={Boolean(status === "loading" || status === "success")}
        loading={status === "loading"}
        fullWidth
        onClick={handleTryAgain}
        size="x-large"
        loadingText="Generating export link..."
      >
        {status === "error" ? "Try again" : "Redirecting..."}
      </Button>
    </PageLayout>
  );
};

export default Review;
