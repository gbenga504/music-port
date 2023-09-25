import React from "react";

import { Toast } from "./Toast";
import { ToastProvider, useToast } from "./ToastContext";

import { Button } from "../Button/Button";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Toast> = {
  title: "Toast",
  component: Toast,
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const BaseToast: Story = {
  render: ({ status, title, description, position }) => {
    const toast = useToast();

    const handleToast = () => {
      toast({
        title,
        status,
        position,
        description,
      });
    };

    return <Button onClick={handleToast}>Show toast</Button>;
  },
  args: {
    status: "info",
    position: "top",
    title: "Best notification",
  },
};
