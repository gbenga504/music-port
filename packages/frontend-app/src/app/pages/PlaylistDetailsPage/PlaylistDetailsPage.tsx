import React from "react";

import { Footer } from "./components/Footer";
import { HeaderDetails } from "./components/HeaderDetails";
import { SongList } from "./components/SongList";

import { HeadMarkup } from "../../components/HeadMarkup";
import { PageLayout } from "../../components/PageLayout";

import type { IPageParams, PageData } from "./load-data";
import type { ILoadableComponentProps } from "../../../utils/route-utils";

const PlaylistDetailsPage: React.FC<
  ILoadableComponentProps<PageData, unknown, IPageParams>
> = ({ pageData }) => {
  const { coverImage, name, genreLink, createdAt, songs, duration, exportId } =
    pageData.playlistById;

  return (
    <PageLayout>
      <HeadMarkup
        title={name}
        ogImage={coverImage}
        ogImageAlt="This is the cover image of the playlist"
      />
      <HeaderDetails
        coverImage={coverImage}
        name={name}
        genreLink={genreLink}
        createdAt={createdAt}
        songs={songs}
        exportId={exportId}
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
