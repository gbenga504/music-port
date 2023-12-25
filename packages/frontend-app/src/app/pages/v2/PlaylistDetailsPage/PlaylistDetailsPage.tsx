import React from "react";

import { HeaderDetails } from "./components/HeaderDetails";
import { SongList } from "./components/SongList";

import { PageLayout } from "../../../components/PageLayout";

import type { IPageParams, PageData } from "./load-data";
import type { ILoadableComponentProps } from "../../../../utils/route-utils";

const GenrePage: React.FC<
  ILoadableComponentProps<PageData, unknown, IPageParams>
> = ({ pageData }) => {
  return (
    <PageLayout title="Playlist Details">
      <HeaderDetails {...pageData.playlistById} />
      <SongList />
    </PageLayout>
  );
};

export default GenrePage;
