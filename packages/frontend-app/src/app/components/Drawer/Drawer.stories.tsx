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
  render: () => {
    const [open, setOpen] = useState(false);

    const handleDrawer = () => {
      setOpen(true);
    };

    return (
      <>
        <Drawer open={open} onClose={() => setOpen(false)}>
          <h1>Drawer Opened</h1>
        </Drawer>

        <Button onClick={handleDrawer}>Open Drawer</Button>
      </>
    );
  },
};
