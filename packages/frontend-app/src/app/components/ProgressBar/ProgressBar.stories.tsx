import React, { useState } from "react";

import { ProgressBar } from "./ProgressBar";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ProgressBar> = {
  title: "ProgressBar",
  component: ProgressBar,
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const BaseProgressBar: Story = {
  render: () => {
    const [value, setValue] = useState(0);

    return (
      <ProgressBar
        value={value}
        max={100}
        granularity={5}
        onChange={(value) => setValue(value)}
      />
    );
  },
};
