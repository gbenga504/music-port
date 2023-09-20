import { Toast } from "./Toast";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Toast> = {
  title: "Toast",
  component: Toast,
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const BaseToast: Story = {
  args: {
    title: "Clipboard",
    description: "Link copied to clipboard",
    status: "success",
    position: "top",
    duration: 15000,
  },
};
