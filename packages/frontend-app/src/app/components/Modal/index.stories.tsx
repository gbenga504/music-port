import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Modal } from "./index";
import { Button } from "../Button";

const meta: Meta<typeof Modal> = {
  title: "Modal",
  component: Modal,
};
export default meta;

const ModalWithHooks = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Storybook Modal">
        Some Modal
      </Modal>
    </>
  );
};

type Story = StoryObj<typeof Modal>;

export const Base: Story = {
  render: () => <ModalWithHooks />,
};
