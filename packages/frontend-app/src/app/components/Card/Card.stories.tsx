import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { Card } from "./Card";

import type { Meta, StoryObj } from "@storybook/react";

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
    src: "https://images.prismic.io/wunderflatscontent/ef754f0d-5903-40b7-a1d6-ea143f480f37_Balcony-M.jpg?auto=compress,format",
    title: "My God Is Still The Same",
    artist: "Sanctus Real",
  },
};
