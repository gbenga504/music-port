import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Card } from "./index";
import { BrowserRouter as Router } from "react-router-dom";

const meta: Meta<typeof Card> = {
  title: "Card",
  component: Card,
  decorators: [
    (Story) => (
      <div className="bg-black w-screen h-screen fixed top-0 left-0 flex items-center justify-center">
        <Router>
          <div className="w-96">
            <Story />
          </div>
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
