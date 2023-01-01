import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { ILoadableComponentProps } from "../../../utils/routeUtils";

import { Button } from "../../components/Button";
import { PageLayout } from "../../components/PageLayout";
import { useToast } from "../../components/Toast/ToastContext";
import { routeIds } from "../../routes";
import { constructURL } from "../../../utils/url";

const CreatePlaylist: React.FC<ILoadableComponentProps> = ({ query, api }) => {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [playlistURL, setPlaylistURL] = useState<string>();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    exportPlaylist();
  }, []);

  async function exportPlaylist() {
    const { platform, exportId } = query;
    setStatus("loading");

    const result = await api.playlist.exportPlaylist({ platform, exportId });

    if (result.error) {
      setStatus("error");
      toast({
        title: result.error.name,
        description: result.error.message,
        status: "error",
      });

      return;
    }

    navigate(constructURL({ routeId: routeIds.exportCreatePlaylist }), {
      replace: true,
    });
    setPlaylistURL(result.data.url);
    setStatus("success");
    toast({
      title: `Your playlist has been exported to ${platform}`,
      status: "success",
    });
  }

  const handleOpenPlaylist = () => {
    window.open(playlistURL, "_blank");
  };

  return (
    <PageLayout
      title="Create Playlist"
      description="We will now create a playlist for you on your selected music streaming platform"
    >
      <Button
        loading={status === "loading"}
        disabled={status === "loading"}
        fullWidth
        size="x-large"
        onClick={status === "error" ? exportPlaylist : handleOpenPlaylist}
        loadingText="Exporting playlist..."
      >
        {status === "success" ? "Open playlist" : "Try again"}
      </Button>
    </PageLayout>
  );
};

export default CreatePlaylist;
