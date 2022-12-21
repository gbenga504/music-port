import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "../../components/Button";
import { useApi } from "../../context/ApiContext";
import { useToast } from "../../components/Toast/ToastContext";

import { getPath, ILoadableComponentProps } from "../../../utils/routeUtils";
import { constructURL } from "../../../utils/url";
import routes, { routeIds } from "../../routes";

const Review: React.FC<ILoadableComponentProps> = () => {
  const { search, pathname } = useLocation();
  const api = useApi();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      const reviewPath = getPath({ routes, routeId: routeIds.importReview });

      // TODO: BUG
      // This is a known bug. We don't need to check the pathname
      // This happens because the location is updated before we can load a new route component
      // causing this useEffect to run a second time
      if (pathname === reviewPath) {
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
          return toast({
            title: result.error.name,
            description: result.error.message,
            status: "error",
          });
        }

        navigate(
          constructURL({
            routeId: routeIds.importCopyExportLink,
            query: { exportId: result.data.exportId },
          })
        );
      }
    })();
  }, [search, pathname]);

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
