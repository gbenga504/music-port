import React, { useState } from "react";

import { Drawer } from "./Drawer";

import { Button } from "../Button/Button";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Drawer> = {
  title: "Drawer",
  component: Drawer,
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const BaseDrawer: Story = {
  render: ({ placement, classes }) => {
    const [open, setOpen] = useState(false);

    const handleDrawer = () => {
      setOpen(true);
    };

    return (
      <>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          placement={placement}
          classes={classes}
        >
          <h1 className="text-white">Drawer Opened</h1>
        </Drawer>

        <Button onClick={handleDrawer}>Open Drawer</Button>
      </>
    );
  },
  args: {
    placement: "right",
    classes: { contentContainer: "!bg-secondary400" },
  },
};
