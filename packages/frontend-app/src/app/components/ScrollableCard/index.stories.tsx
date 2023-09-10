import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter as Router } from "react-router-dom";

import { ScrollableCard } from "./index";
// import { BaseCard } from "../Card/index.stories";

const meta: Meta<typeof ScrollableCard> = {
  title: "Scrollable Card",
  component: ScrollableCard,
  decorators: [
    (Story) => (
      <div className="bg-black w-screen h-screen fixed top-0 left-0 flex items-center justify-center">
        <Router>
          <Story />
        </Router>
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ScrollableCard>;

export const BaseScroll: Story = {
  //  args:{
  //   children: <BaseCard {...BaseCard.args} />
  //  }
};
