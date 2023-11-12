import { Input } from "./Input";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Input> = {
  title: "Input",
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const BaseInput: Story = {
  args: {
    size: "medium",
    type: "text",
    label: "Your name",
    placeholder: "E.g John Doe",
  },
};
