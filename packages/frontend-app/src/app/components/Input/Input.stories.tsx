import React from "react";

import { Input } from "./Input";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Input> = {
  title: "Input",
  component: Input,
  decorators: [
    (Story) => (
      <div className="flex justify-center items-center bg-white w-screen h-screen">
        <Story />
      </div>
    ),
  ],
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
