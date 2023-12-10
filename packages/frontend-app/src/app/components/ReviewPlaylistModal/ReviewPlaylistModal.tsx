import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useApi } from "../../context/ApiContext";
import useParsedQueryParams from "../../hooks/useParsedQueryParams";
import { Modal } from "../Modal/Modal";
import { useToast } from "../Toast/ToastContext";

import type { PlaylistAction } from "./types";

interface IProps {
  open: boolean;
}

export const ReviewPlaylistModal: React.FC<IProps> = ({ open }) => {
  const [query] = useParsedQueryParams();
  const api = useApi();
  const toast = useToast();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const action = query.action as PlaylistAction;

    if (action) {
      switch (action) {
        default:
          handleCreatePlaylist();
      }
    }
  }, []);

  const handleClose = () => {
    navigate(pathname, { replace: true });
  };

  const handleCreatePlaylist = async () => {
    const { author, playlistLink, playlistGenre, streamingService } = query;

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
