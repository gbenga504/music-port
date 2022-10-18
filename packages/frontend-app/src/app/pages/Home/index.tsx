import React from "react";

const Home = (props: any) => {
  console.log("gadman", props);

  return (
    <span>
      Gbenga<button onClick={() => console.log("hey")}>click me</button>
    </span>
  );
};

export default Home;
