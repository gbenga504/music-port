import React from "react";

import { Select, Option } from "./Select";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Select> = {
  title: "Select",
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

const genres = ["Afro", "Pop", "Jazz", "Rap"];
const options = (
  <div>
    {genres.map((genre) => (
      <Option value={genre} key={genre}>
        {genre}
      </Option>
    ))}
  </div>
);

export const BaseSelect: Story = {
  args: {
    label: "Playlist genre",
    placeholder: "Select a genre",
    children: options,
  },
};
