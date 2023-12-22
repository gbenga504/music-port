import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { REVIEW_ACTION, parseModalData, type ReviewActionType } from "./utils";

import { useApi } from "../../context/ApiContext";
import {
  LOCAL_STORAGE_KEY,
  useLocalStorage,
} from "../../hooks/useLocalStorage";
import { Modal } from "../Modal/Modal";
import { useToast } from "../Toast/ToastContext";

import type { ValidateModalData } from "./utils";

interface IProps {
  open: boolean;
}

export const ReviewPlaylistModal: React.FC<IProps> = ({ open }) => {
  const [modalData, setModalData] = useLocalStorage<Record<string, unknown>>(
    LOCAL_STORAGE_KEY.REVIEW_PLAYLIST_MODAL,
    {
      action: undefined,
    }
  );
  const api = useApi();
  const toast = useToast();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const action = modalData.action as ReviewActionType;

    if (action && open) {
      switch (action) {
        default: {
          const parsedModalData = parseModalData(
            REVIEW_ACTION.CREATE_PLAYLIST,
            modalData.data
          );

          handleCreatePlaylist(parsedModalData);
        }
      }

      // Here we reset the modal data
      setModalData({ action: undefined });
    }
  }, [open]);

  const handleClose = () => {
    navigate(pathname, { replace: true });
  };

  const handleCreatePlaylist = async (
    data: ValidateModalData<typeof REVIEW_ACTION.CREATE_PLAYLIST>
  ) => {
    const { author, playlistLink, playlistGenre, streamingService } = data;

    const result = await api.playlist.createPlaylist({
      author,
      playlistLink,
      playlistGenre,
      platform: streamingService,
    });

    if (result.error) {
      toast({
        title: result.error.name,
        description: result.error.message,
        status: "error",
      });
    }

    if (result.data) {
      toast({
        title: "Playlist created",
        description: `Your playlist (${result.data.name}) has been created`,
        status: "success",
        duration: 4000,
      });
    }

    handleClose();
  };

  return (
    <Modal open={open} closable={false}>
      <div className="flex justify-center items-center text-black">
        Loading...
      </div>
    </Modal>
  );
};
