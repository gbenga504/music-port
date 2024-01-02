import classNames from "classnames";
import React from "react";

import { convertAPIPlaylistToPlayerPlaylist } from "../../../../utils/playlist";
import { constructURL } from "../../../../utils/url";
import { Card } from "../../../components/Card/Card";
import { CardList } from "../../../components/CardList/CardList";
import { PageLayout } from "../../../components/PageLayout";
import { usePlayer } from "../../../components/Player/PlayerContext";
import { ROUTE_IDS } from "../../../routes";

import type { IPageQuery, PageData } from "./load-data";
import type { ILoadableComponentProps } from "../../../../utils/route-utils";

const DiscoverPage: React.FC<ILoadableComponentProps<PageData, IPageQuery>> = ({
  pageData,
}) => {
  const { onChangePlaylist } = usePlayer();
  const { featuredPlaylists } = pageData;

  return (
    <PageLayout title="Discover | Find the timeless songs">
      {featuredPlaylists.map((featuredPlaylist, index) => (
        <div
          key={featuredPlaylist.genre}
          className={index === 0 ? "pt-0" : "pt-12"}
        >
          <CardList
            title={featuredPlaylist.genre}
            to={constructURL({
              routeId: ROUTE_IDS.genrePage,
              params: { genre: featuredPlaylist.genre },
            })}
            classNames={{
              ul: classNames(
                "gap-2.5 lg:gap-5",
                "w-screen -ml-6 px-6",
                "md:w-full md:ml-0 md:px-0"
              ),
            }}
          >
            {featuredPlaylist.items.map((playlist) => (
              <li key={playlist.id} className="w-[144px] lg:w-[204px]">
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
          </CardList>
        </div>
      ))}
    </PageLayout>
  );
};

export default DiscoverPage;
