import React from "react";

import { PageLayout } from "../../../components/v2/PageLayout";

import type { ILoadableComponentProps } from "../../../../utils/route-utils";
import type { IPageQuery } from "./loadData";

const Home: React.FC<ILoadableComponentProps<unknown, IPageQuery>> = () => {
  return <PageLayout title="Discover | Find the timeless songs"></PageLayout>;
};

export default Home;
