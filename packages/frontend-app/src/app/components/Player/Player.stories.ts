import { Player } from "./Player";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Player> = {
  title: "Player",
  component: Player,
};

export default meta;
type Story = StoryObj<typeof Player>;

export const BasePlayer: Story = {
  args: {
    playlist: [
      {
        name: "For Tonight",
        artists: ["Giveon"],
        duration: 3000,
        previewURL:
          "https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample.mp3",
        coverImage:
          "https://images.prismic.io/wunderflatscontent/ef754f0d-5903-40b7-a1d6-ea143f480f37_Balcony-M.jpg?auto=compress,format",
      },
      {
        name: "Chop Life",
        artists: ["Flavour", "Phyno"],
        duration: 2000,
        previewURL:
          "https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample2.mp3",
        coverImage:
          "https://wunderflatsng.blob.core.windows.net/artefacts/city-images-webp/Munich_400.webp",
      },
    ],
  },
};
