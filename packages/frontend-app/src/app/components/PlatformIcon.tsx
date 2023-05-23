import React from "react";

import { Platform } from "../../utils/platform";
import {
  AppleMusicIcon,
  DeezerIcon,
  SpotifyIcon,
  YoutubeMusicIcon,
} from "./icons";

interface IProps {
  platform: Platform;
}

export const PlatformIcon: React.FC<IProps> = ({ platform }) => {
  switch (platform) {
    case Platform.Spotify:
      return <SpotifyIcon />;
    case Platform.Deezer:
      return <DeezerIcon />;
    case Platform.YoutubeMusic:
      return <YoutubeMusicIcon />;
    default:
      return <AppleMusicIcon />;
  }
};
