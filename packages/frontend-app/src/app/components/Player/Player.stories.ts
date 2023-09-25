import { Player } from "./Player";

import { PlaylistGenre } from "../../../utils/platform";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Player> = {
  title: "Player",
  component: Player,
};

export default meta;
type Story = StoryObj<typeof Player>;

export const BasePlayer: Story = {
  args: {
    playlist: {
      coverImage:
        "https://images.prismic.io/wunderflatscontent/ef754f0d-5903-40b7-a1d6-ea143f480f37_Balcony-M.jpg?auto=compress,format",
      name: "For Tonight",
      owner: {
        name: "Giveon",
      },
      apiLink: "https://google.com",
      duration: 1000,
      exportId: "1",
      genre: PlaylistGenre.Afro,
    } as any,
  },
};
