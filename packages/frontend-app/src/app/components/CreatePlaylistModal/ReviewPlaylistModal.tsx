import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  REVIEW_PLAYLIST_MODAL_LOCAL_STORAGE_KEY,
  parseReviewPlaylist,
} from "./utils";

import { useApi } from "../../context/ApiContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Modal } from "../Modal/Modal";
import { useToast } from "../Toast/ToastContext";

import type { ReviewPlaylist } from "./utils";

interface IProps {
  open: boolean;
}

export const ReviewPlaylistModal: React.FC<IProps> = ({ open }) => {
  const [modalData, setModalData] = useLocalStorage<Record<string, unknown>>(
    REVIEW_PLAYLIST_MODAL_LOCAL_STORAGE_KEY,
    {}
  );
  const api = useApi();
  const toast = useToast();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (open && Object.keys(modalData).length > 0) {
      const parsedModalData = parseReviewPlaylist(modalData);
      handleCreatePlaylist(parsedModalData);
    }
  }, [open]);

  const handleClose = () => {
    navigate(pathname, { replace: true });
  };

  const handleCreatePlaylist = async (data: ReviewPlaylist) => {
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

    setModalData({});
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
