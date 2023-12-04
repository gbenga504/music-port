import React from "react";

import { AppHeader } from "./AppHeader/AppHeader";
import { DesktopSidebar } from "./DesktopSidebar";
import { HeadMarkup } from "./HeadMarkup";
import { usePlayer } from "./Player/PlayerContext";

import type { ReactNode } from "react";

interface IProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export const PageLayout: React.FC<IProps> = ({ title, description }) => {
  const { onChangePlaylist } = usePlayer();

  return (
    <div className={"mx-0 h-screen grid grid-cols-1 lg:grid-cols-[260px_4fr]"}>
      <HeadMarkup title={title} description={description} />
      <div className="hidden lg:block">
        <DesktopSidebar />
      </div>
      <div>
        <AppHeader />
        <div>
          <button
            onClick={() => {
              onChangePlaylist([
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
              ]);
            }}
          >
            Playlist 1
          </button>
          <button
            onClick={() => {
              onChangePlaylist([
                {
                  name: "Chop Life",
                  artists: ["Flavour", "Phyno"],
                  duration: 2000,
                  previewURL:
                    "https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample2.mp3",
                  coverImage:
                    "https://wunderflatsng.blob.core.windows.net/artefacts/city-images-webp/Munich_400.webp",
                },
              ]);
            }}
          >
            Playlist 2
          </button>
        </div>
      </div>
    </div>
  );
};
