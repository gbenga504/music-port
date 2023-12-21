import React from "react";

import { convertAPIPlaylistToPlayerPlaylist } from "../../../../utils/playlist";
import { Card } from "../../../components/Card/Card";
import { PageLayout } from "../../../components/PageLayout";
import { usePlayer } from "../../../components/Player/PlayerContext";

import type { IPageParams, PageData } from "./load-data";
import type { ILoadableComponentProps } from "../../../../utils/route-utils";

const GenrePage: React.FC<
  ILoadableComponentProps<PageData, unknown, IPageParams>
> = ({ pageData }) => {
  const { onChangePlaylist } = usePlayer();
  const { playlistsByGenre } = pageData;

  return (
    <PageLayout title="Discover | Find the timeless songs">
      <h2 className="font-medium text-base mb-2">{playlistsByGenre.genre}</h2>
      <ul className="grid grid-cols-5 gap-5 justify-items-center">
        {playlistsByGenre.items.map((playlist) => (
          <li key={playlist.id} className="w-full">
            <Card
              src={playlist.coverImage}
              title={playlist.name}
              owner={playlist.owner.name}
              link=""
              onClickPlay={() =>
                onChangePlaylist(
                  convertAPIPlaylistToPlayerPlaylist(playlist.songs)
                )
              }
            />
          </li>
        ))}
      </ul>
    </PageLayout>
  );
};

export default GenrePage;
