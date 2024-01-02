import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  PORT_PLAYLIST_MODAL_LOCAL_STORAGE_KEY,
  parsePortPlaylist,
} from "./utils";

import { Button } from "../../../../../components/Button/Button";
import { Input } from "../../../../../components/Input/Input";
import { Modal } from "../../../../../components/Modal/Modal";
import { Space } from "../../../../../components/Space";
import { useToast } from "../../../../../components/Toast/ToastContext";
import { CopyIcon } from "../../../../../components/icons";
import { useApi } from "../../../../../context/ApiContext";
import useCopyToClipboard from "../../../../../hooks/useCopyToClipboard";
import { useLocalStorage } from "../../../../../hooks/useLocalStorage";

import type { PortPlaylist } from "./utils";

interface IProps {
  open: boolean;
  exportId: string;
}

export const PortPlaylistModal: React.FC<IProps> = ({ open, exportId }) => {
  const [playlistURL, setPlaylistURL] = useState<string>();
  const [modalData, setModalData] = useLocalStorage<Record<string, unknown>>(
    PORT_PLAYLIST_MODAL_LOCAL_STORAGE_KEY,
    {}
  );
  const api = useApi();
  const toast = useToast();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [_, copy] = useCopyToClipboard();

  useEffect(() => {
    if (open && Object.keys(modalData).length > 0) {
      const parsedModalData = parsePortPlaylist({ ...modalData, exportId });
      handlePortPlaylist(parsedModalData);
    }
  }, [open]);

  const handleClose = () => {
    navigate(pathname, { replace: true });
  };

  const handlePortPlaylist = async (data: PortPlaylist) => {
    const { exportId, platform } = data;

    const result = await api.playlist.portPlaylist({
      exportId,
      platform,
    });

    setModalData({});

    if (result.error) {
      toast({
        title: result.error.name,
        description: result.error.message,
        status: "error",
      });

      return handleClose();
    }

    if (result.data) {
      setPlaylistURL(result.data.url);
    }
  };

  return (
    <Modal
      title={playlistURL ? "Your Playlist Link" : undefined}
      open={open}
      closable={Boolean(playlistURL)}
      onClose={playlistURL ? handleClose : undefined}
    >
      {playlistURL ? (
        <form className="mt-8">
          <Space.Compact>
            <Input
              fullWidth
              placeholder="E.g John Doe"
              disabled
              value={playlistURL}
            />
            <Button
              htmlType="button"
              onClick={() => {
                copy(playlistURL);

                toast({
                  title: "Link copied to cliboard!",
                  status: "info",
                });
              }}
              icon={<CopyIcon className="mr-2" />}
            >
              Copy
            </Button>
          </Space.Compact>
        </form>
      ) : (
        <div className="flex justify-center items-center text-black">
          Loading...
        </div>
      )}
    </Modal>
  );
};
