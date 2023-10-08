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
  render: ({ ...rest }) => {
    const [value, setValue] = useState(rest.value);

    return (
      <ProgressBar
        {...rest}
        value={value}
        onChange={(value) => setValue(value)}
      />
    );
  },
  args: {
    max: 100,
    value: 10,
  },
};
