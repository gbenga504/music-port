import React from "react";

import {
  AppleMusicIcon,
  DeezerIcon,
  SpotifyIcon,
  YoutubeMusicIcon,
} from "./icons";

import { PlaylistPlatform } from "../api/graphql/graphql-client.gen";

interface IProps {
  platform: PlaylistPlatform;
}

export const PlatformIcon: React.FC<IProps> = ({ platform }) => {
  switch (platform) {
    case PlaylistPlatform.Spotify:
      return <SpotifyIcon />;
    case PlaylistPlatform.Deezer:
      return <DeezerIcon />;
    case PlaylistPlatform.YoutubeMusic:
      return <YoutubeMusicIcon />;
    default:
      return <AppleMusicIcon />;
  }
};
