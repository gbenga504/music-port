import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Card } from "./index";
import { BrowserRouter as Router } from "react-router-dom";

const meta: Meta<typeof Card> = {
  title: "Card",
  component: Card,
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

type Story = StoryObj<typeof Card>;

export const BaseCard: Story = {
  args: {
    src: "",
    title: "My God Is Still The Same",
    artist: "Sanctus Real",
  },
};
