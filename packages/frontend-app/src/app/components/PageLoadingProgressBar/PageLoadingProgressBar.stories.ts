import { PageLoadingProgressBar } from "./PageLoadingProgressBar";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof PageLoadingProgressBar> = {
  title: "PageLoadingProgressBar",
  component: PageLoadingProgressBar,
};

export default meta;
type Story = StoryObj<typeof PageLoadingProgressBar>;

export const BasePageLoadingProgressBar: Story = {
  args: { variant: "indeterminate" },
};
