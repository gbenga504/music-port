import React, { useState } from "react";
import { Toast } from "./Toast";

import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button/Button";

const meta: Meta<typeof Toast> = {
  title: "Toast",
  component: Toast,
};

export default meta;
type Story = StoryObj<typeof Toast>;

const ButtonWithHooks = () => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<
    "success" | "info" | "error" | "warning"
  >();

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
          setStatus("success");
        }}
        className="mr-3"
      >
        Success Toast
      </Button>
      <Button
        onClick={() => {
          setOpen(true);
          setStatus("info");
        }}
        className="mr-3"
      >
        Info Toast
      </Button>
      <Button
        onClick={() => {
          setOpen(true);
          setStatus("error");
        }}
        className="mr-3"
      >
        Error Toast
      </Button>
      <Button
        onClick={() => {
          setOpen(true);
          setStatus("warning");
        }}
      >
        Warning Toast
      </Button>
      {open && (
        <Toast
          title="Toast"
          description="Toast me :)"
          status={status}
          position="top"
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

export const BaseToast: Story = {
  render: () => <ButtonWithHooks />,
};
