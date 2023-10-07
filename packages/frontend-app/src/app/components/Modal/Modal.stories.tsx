import React, { useState } from "react";

import { Modal } from "./Modal";

import { Button } from "../Button/Button";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Modal> = {
  title: "Modal",
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const BaseModal: Story = {
  render: ({ title, okButton, width }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };

    return (
      <>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title={title}
          okButton={okButton}
          width={width}
        >
          Modal is now open
        </Modal>

        <Button onClick={handleOpen}>Show Modal</Button>
      </>
    );
  },
  args: {
    title: "Modal",
    okButton: {
      variant: "contained",
      size: "medium",
      color: "primary",
      children: "Close",
    },
    width: "md",
  },
};
