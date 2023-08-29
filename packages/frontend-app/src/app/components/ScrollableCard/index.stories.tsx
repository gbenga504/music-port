import { Meta, StoryObj } from "@storybook/react";

import { ScrollableCard } from "./index";

const meta: Meta<typeof ScrollableCard> = {
  title: "Scrollable Card",
  component: ScrollableCard,
};
export default meta;

type Story = StoryObj<typeof ScrollableCard>;

export const Scroll: Story = {};
