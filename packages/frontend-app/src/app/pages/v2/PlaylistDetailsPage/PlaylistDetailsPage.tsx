import React from "react";

import { Footer } from "./components/Footer";
import { HeaderDetails } from "./components/HeaderDetails";
import { SongList } from "./components/SongList";

import { PageLayout } from "../../../components/PageLayout";

import type { IPageParams, PageData } from "./load-data";
import type { ILoadableComponentProps } from "../../../../utils/route-utils";

const PlaylistDetailsPage: React.FC<
  ILoadableComponentProps<PageData, unknown, IPageParams>
> = ({ pageData }) => {
  const { coverImage, name, genre, createdAt, songs, duration } =
    pageData.playlistById;

  return (
    <PageLayout title="Playlist Details">
      <HeaderDetails
        coverImage={coverImage}
        name={name}
        genre={genre}
        createdAt={createdAt}
        songs={songs}
      />
      <section className="w-full mt-10 mb-6">
        <SongList songs={songs} />
      </section>
      <div className="mb-16">
        <Footer songs={songs} duration={duration} />
      </div>
    </PageLayout>
  );
};

export default PlaylistDetailsPage;
