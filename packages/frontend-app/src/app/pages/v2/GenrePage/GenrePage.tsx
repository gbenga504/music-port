import React from "react";

import { convertAPIPlaylistToPlayerPlaylist } from "../../../../utils/playlist";
import { constructURL } from "../../../../utils/url";
import { Card } from "../../../components/Card/Card";
import { PageLayout } from "../../../components/PageLayout";
import { usePlayer } from "../../../components/Player/PlayerContext";
import { ROUTE_IDS } from "../../../routes";

import type { IPageParams, PageData } from "./load-data";
import type { ILoadableComponentProps } from "../../../../utils/route-utils";

const GenrePage: React.FC<
  ILoadableComponentProps<PageData, unknown, IPageParams>
> = ({ pageData }) => {
  const { onChangePlaylist } = usePlayer();
  const { playlistsByGenre } = pageData;

  return (
    <PageLayout title={`Genre | ${playlistsByGenre.genre.name}`}>
      <h2 className="font-medium text-base mb-2">
        {playlistsByGenre.genre.name}
      </h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2.5 gap-y-5 lg:gap-5 justify-items-center">
        {playlistsByGenre.items.map((playlist) => (
          <li key={playlist.id} className="w-full">
            <Card
              src={playlist.coverImage}
              title={playlist.name}
              owner={playlist.owner.name}
              link={constructURL({
                routeId: ROUTE_IDS.playlistDetailsPage,
                params: { id: playlist.id },
              })}
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
