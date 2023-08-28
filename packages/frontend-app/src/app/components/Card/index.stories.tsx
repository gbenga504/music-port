import { Meta, StoryObj } from "@storybook/react";

import { Card } from "./index";

const meta: Meta<typeof Card> = {
  title: "Card",
  component: Card,
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Small: Story = {};
