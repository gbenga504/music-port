import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

import { PlaylistActionValues } from "./types";

import {
  PlaylistGenreValues,
  PlaylistPlatformValues,
} from "../../../utils/platform";
import { useApi } from "../../context/ApiContext";
import useParsedQueryParams from "../../hooks/useParsedQueryParams";
import { Modal } from "../Modal/Modal";
import { useToast } from "../Toast/ToastContext";

import type { PlaylistActionType } from "./types";
import type { PlaylistPlatform } from "../../api/graphql/graphql-client.gen";
import type { PlaylistGenre } from "../../api/graphql/graphql-client.gen";

interface IProps {
  open: boolean;
}

const validateURLQueryParamsSchema = z.object({
  action: z.enum(
    PlaylistActionValues as [PlaylistActionType, ...PlaylistActionType[]]
  ),
  author: z.string(),
  playlistLink: z.string(),
  playlistGenre: z.enum(
    PlaylistGenreValues as [PlaylistGenre, ...PlaylistGenre[]]
  ),
  streamingService: z.enum(
    PlaylistPlatformValues as [PlaylistPlatform, ...PlaylistPlatform[]]
  ),
});

export type validateURLQueryParamsSchemaType = z.infer<
  typeof validateURLQueryParamsSchema
>;

export const ReviewPlaylistModal: React.FC<IProps> = ({ open }) => {
  const [query] = useParsedQueryParams<validateURLQueryParamsSchemaType>(
    undefined,
    validateURLQueryParamsSchema
  );
  const api = useApi();
  const toast = useToast();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const action = query.action;

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
