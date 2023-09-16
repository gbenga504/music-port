import React from "react";

import { PageLayout } from "../../../components/PageLayout";

import type { IPageQuery } from "./load-data";
import type { ILoadableComponentProps } from "../../../../utils/route-utils";

const Home: React.FC<ILoadableComponentProps<unknown, IPageQuery>> = () => {
  return <PageLayout title="Discover | Find the timeless songs"></PageLayout>;
};

export default Home;
