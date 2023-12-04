import React from "react";

import { getDisplayNameForArtists } from "./utils";

import { Space } from "../Space";

import type { ISongWithId } from "./utils";

interface IProps {
  currentSong: ISongWithId;
}

export const MusicInfo: React.FC<IProps> = ({ currentSong }) => {
  return (
    <Space size="small">
      <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-md bg-secondary100">
        {currentSong.coverImage && (
          <img
            src={currentSong.coverImage}
            className="w-10 h-10 lg:w-14 lg:h-14 rounded-md object-cover"
          />
        )}
      </div>
      <div className="font-light flex flex-col">
        <span className="text-white text-xs lg:text-sm">
          {currentSong.name}
        </span>
        <span className="text-secondary50 text-xxs">
          {getDisplayNameForArtists({ currentSong })}
        </span>
      </div>
    </Space>
  );
};
