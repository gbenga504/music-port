import dayjs from "dayjs";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { InitiatePortPlaylistModal } from "./PortPlaylistModal/InitiatePortPlaylistModal";
import { PortPlaylistModal } from "./PortPlaylistModal/PortPlaylistModal";

import { convertAPIPlaylistToPlayerPlaylist } from "../../../../utils/playlist";
import { constructURL } from "../../../../utils/url";
import { Button } from "../../../components/Button/Button";
import { IconButton } from "../../../components/IconButton/IconButton";
import { LazyImage } from "../../../components/LazyImage/LazyImage";
import { usePlayer } from "../../../components/Player/PlayerContext";
import { Space } from "../../../components/Space";
import { useToast } from "../../../components/Toast/ToastContext";
import { ConvertIcon, CopyIcon, PlayIcon } from "../../../components/icons";
import useCopyToClipboard from "../../../hooks/useCopyToClipboard";
import useParsedQueryParams from "../../../hooks/useParsedQueryParams";
import { ROUTE_IDS } from "../../../routes";

import type { Playlist } from "../../../api/graphql/graphql-client.gen";

type IProps = Pick<
  Playlist,
  "coverImage" | "name" | "genreLink" | "createdAt" | "songs" | "exportId"
>;

export const HeaderDetails: React.FC<IProps> = ({
  coverImage,
  name,
  genreLink,
  createdAt,
  songs,
  exportId,
}) => {
  const [
    openInitiateConvertPlaylistModal,
    setOpenInitiateConvertPlaylistModal,
  ] = useState(false);
  const toast = useToast();
  const [_, copy] = useCopyToClipboard();
  const { onChangePlaylist } = usePlayer();
  const [query] = useParsedQueryParams();

  const renderSharePlaylistSection = () => {
    return (
      <div className="flex gap-2 items-center -mt-1">
        <span className="text-xs text-whiteWithAlpha">
          CREATED {dayjs.utc(createdAt).fromNow().toUpperCase()}
        </span>
        <IconButton
          onClick={() => {
            copy(window.location.href);

            toast({
              title: "Link copied to clipboard",
              status: "info",
              position: "top",
            });
          }}
        >
          <CopyIcon size={13} />
        </IconButton>
      </div>
    );
  };

  const renderPreviewButton = () => {
    return (
      <Space className="mt-4">
        <Button
          size="small"
          onClick={() => {
            onChangePlaylist(convertAPIPlaylistToPlayerPlaylist(songs));
          }}
          icon={<PlayIcon size={12} fillColorClassName="fill-white" />}
        >
          Preview
        </Button>
        <Button
          size="small"
          onClick={() => {
            setOpenInitiateConvertPlaylistModal(true);
          }}
          icon={<ConvertIcon size={16} fillColor="white" />}
        >
          Export
        </Button>
      </Space>
    );
  };

  return (
    <header className="flex flex-col lg:flex-row gap-x-8 items-center lg:items-end">
      <section className="w-56 h-56 bg-secondary100 rounded-md">
        <LazyImage
          className="rounded-md w-full h-full object-cover"
          src={coverImage}
        />
      </section>
      <section className="flex flex-col items-center lg:items-start mt-4 lg:mt-0">
        <Link
          className="text-base hover:underline font-normal text-primary capitalize"
          to={constructURL({
            routeId: ROUTE_IDS.genrePage,
            params: { id: genreLink.id },
          })}
        >
          {genreLink.name}
        </Link>
        <h1 className="text-6xl sm:text-7xl font-bold capitalize text-center -mt-1">
          {name}
        </h1>
        {renderSharePlaylistSection()}
        {renderPreviewButton()}
      </section>
      <InitiatePortPlaylistModal
        open={openInitiateConvertPlaylistModal}
        onClose={() => setOpenInitiateConvertPlaylistModal(false)}
      />
      <PortPlaylistModal
        open={query["portPlaylist"] === "true"}
        exportId={exportId}
      />
    </header>
  );
};
