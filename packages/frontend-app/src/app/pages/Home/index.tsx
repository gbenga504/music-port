import React from "react";
import { ILoadableComponentProps } from "../../utils/routeUtils";

const Home = (props: ILoadableComponentProps) => {
  console.log("gadman", props);

  return (
    <span>
      Gbenga<button onClick={() => console.log("hey")}>click me</button>
    </span>
  );
};

export default Home;
