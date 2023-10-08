import React from "react";

import { Button } from "./Button";

import { DiscoverIcon } from "../icons";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const BaseButton: Story = {
  args: {
    variant: "contained",
    children: "Simple button",
    size: "small",
    color: "primary",
    focused: true,
  },
};

export const ButtonWithIcon: Story = {
  render: ({ ...rest }) => {
    return (
      <Button {...rest} icon={<DiscoverIcon />}>
        Discover
      </Button>
    );
  },
  args: {
    variant: "transparent",
    size: "medium",
  },
};
