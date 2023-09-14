import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";
import { DiscoverIcon } from "../../icons";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  decorators: [
    (Story) => (
      <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-secondary400">
        <Story />
      </div>
    ),
  ],
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
  render: () => {
    return (
      <Button
        variant="transparent"
        size="medium"
        focused
        icon={<DiscoverIcon />}
      >
        Discover
      </Button>
    );
  },
};
