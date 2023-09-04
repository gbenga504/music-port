import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter as Router } from "react-router-dom";

import { ScrollableCard } from "./index";
import { BaseCard } from "../Card/index.stories";

const meta: Meta<typeof ScrollableCard> = {
  title: "Scrollable Card",
  component: ScrollableCard,
  decorators: [
    (Story) => (
      <div className="bg-black">
        <Router>
          <Story />
        </Router>
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ScrollableCard>;

export const BaseScroll: Story = {};
