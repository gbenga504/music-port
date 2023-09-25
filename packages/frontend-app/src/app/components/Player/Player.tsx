import React, { useState } from "react";

import { IconButton } from "../IconButton/IconButton";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { Space } from "../Space";
import {
  RewindIcon,
  FastForwardIcon,
  PlayIcon,
  VolumeIcon,
  PauseIcon,
} from "../icons";

import type { Playlist } from "../../api/graphql/graphql-client.gen";

interface IProps {
  playlist: Playlist;
}

export const Player: React.FC<IProps> = ({ playlist }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const renderMusicInfo = () => {
    return (
      <Space>
        <div className="w-10 h-40 lg:w-14 lg:h-14 rounded-md bg-secondary100">
          {playlist.coverImage && (
            <img
              src={playlist.coverImage}
              className="w-10 h-40 lg:w-14 lg:h-14 rounded-md object-cover"
            />
          )}
        </div>
        <div className="font-light flex flex-col">
          <span className="text-white text-sm font-normal">
            {playlist.name}
          </span>
          <span className="text-secondary50 text-xxs">
            {playlist.owner.name}
          </span>
        </div>
      </Space>
    );
  };

  const renderPlayer = () => {
    return (
      <div className="flex flex-col w-full justify-center">
        <Space size="small" className="justify-center">
          <IconButton size="small" variant="transparent">
            <RewindIcon size={16} />
          </IconButton>
          <IconButton
            size="small"
            color="white"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
          </IconButton>
          <IconButton size="small" variant="transparent">
            <FastForwardIcon size={16} />
          </IconButton>
        </Space>
        <div className="mt-1 flex gap-2 items-center font-light text-secondary50">
          <span className="text-xxs">0:00</span>
          <div className="w-full">
            <ProgressBar />
          </div>
          <span className="text-xxs">5:00</span>
        </div>
      </div>
    );
  };

  const renderVolumeManager = () => {
    return (
      <div className="flex justify-end items-center gap-1">
        <div className="w-3/5 gap-1 flex items-center">
          <IconButton variant="transparent" size="small">
            <VolumeIcon size={16} />
          </IconButton>
          <div className="w-full">
            <ProgressBar />
          </div>
        </div>
      </div>
    );
  };

  const renderDesktopView = () => {
    return (
      <div className="hidden lg:grid grid-cols-[3fr_6fr_3fr] gap-x-3">
        {renderMusicInfo()}
        {renderPlayer()}
        {renderVolumeManager()}
      </div>
    );
  };

  const renderMobileView = () => {
    return null;
  };

  return (
    <footer className="w-full">
      {renderDesktopView()}
      {renderMobileView()}
    </footer>
  );
};
