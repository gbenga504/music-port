import React from "react";

import { calculateTime } from "../../../../../utils/playlist";

import type { Playlist } from "../../../../api/graphql/graphql-client.gen";

interface IProps {
  songs: Playlist["songs"];
  duration: Playlist["duration"];
}

export const Footer: React.FC<IProps> = ({ songs, duration }) => {
  return (
    <footer className="text-sm text-whiteWithAlpha w-full">
      {songs.length} Songs, {calculateTime(duration, "LONG")}
    </footer>
  );
};
