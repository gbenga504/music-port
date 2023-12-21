import React from "react";

import { convertAPIPlaylistToPlayerPlaylist } from "../../../../utils/playlist";
import { Card } from "../../../components/Card/Card";
import { CardList } from "../../../components/CardList/CardList";
import { PageLayout } from "../../../components/PageLayout";
import { usePlayer } from "../../../components/Player/PlayerContext";

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
          className={index === 0 ? "pt-6" : "pt-12"}
        >
          <CardList title={featuredPlaylist.genre} to="">
            {featuredPlaylist.items.map((playlist) => (
              <li key={playlist.id} className="w-[204px]">
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
          </CardList>
        </div>
      ))}
    </PageLayout>
  );
};

export default DiscoverPage;
