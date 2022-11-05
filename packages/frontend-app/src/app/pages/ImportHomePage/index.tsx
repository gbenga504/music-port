import React from "react";
import "./index.css";

import { HeadMarkup } from "../../components/HeadMarkup";
import { ILoadableComponentProps } from "../../utils/routeUtils";

const Home = (props: ILoadableComponentProps) => {
  return (
    <>
      <HeadMarkup title="Home" />
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <span>
        Gbenga<button onClick={() => console.log(props)}>click me</button>
      </span>
    </>
  );
};

export default Home;
