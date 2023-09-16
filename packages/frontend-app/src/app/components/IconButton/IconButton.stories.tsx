import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { IconButton } from "./IconButton";
import { PlayIcon } from "../icons";

const meta: Meta<typeof IconButton> = {
  title: "IconButton",
  component: IconButton,
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const BaseIconButton: Story = {
  args: {
    size: "small",
    color: "primary",
    children: <PlayIcon size={13} className="ml-1" />,
  },
};
