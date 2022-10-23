import React from "react";

import { HeadMarkup } from "../../components/HeadMarkup";
import { ILoadableComponentProps } from "../../utils/routeUtils";

const Home = (props: ILoadableComponentProps) => {
  console.log("gadman", props);

  return (
    <>
      <HeadMarkup title="Home" />
      <span>
        Gbenga<button onClick={() => console.log("hey")}>click me</button>
      </span>
    </>
  );
};

export default Home;
