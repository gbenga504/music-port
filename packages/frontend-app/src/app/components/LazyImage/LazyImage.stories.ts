import { LazyImage } from "./LazyImage";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof LazyImage> = {
  title: "LazyImage",
  component: LazyImage,
};

export default meta;
type Story = StoryObj<typeof LazyImage>;

export const BaseInput: Story = {
  args: {
    src: "https://images.prismic.io/wunderflatscontent/ef754f0d-5903-40b7-a1d6-ea143f480f37_Balcony-M.jpg?auto=compress,format",
    width: "100px",
    height: "100px",
  },
};
