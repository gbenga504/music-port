import React from "react";

import { Card } from "../../../components/Card/Card";
import { CardList } from "../../../components/CardList/CardList";
import { PageLayout } from "../../../components/PageLayout";

import type { IPageQuery, PageData } from "./load-data";
import type { ILoadableComponentProps } from "../../../../utils/route-utils";

const Discover: React.FC<ILoadableComponentProps<PageData, IPageQuery>> = ({
  pageData,
}) => {
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
                />
              </li>
            ))}
          </CardList>
        </div>
      ))}
    </PageLayout>
  );
};

export default Discover;
