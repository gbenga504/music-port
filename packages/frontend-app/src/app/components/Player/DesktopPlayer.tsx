import React, { useState } from "react";

import { MusicInfo } from "./MusicInfo";
import { PlayButton } from "./PlayButton";
import { SongDurationSlider } from "./SongDurationSlider";
import { calculateTime, handleFastForward, handleRewind } from "./utils";

import { IconButton } from "../IconButton/IconButton";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { Space } from "../Space";
import { FastForwardIcon, RewindIcon, VolumeIcon } from "../icons";

import type { ISongWithId } from "./utils";

interface IProps {
  currentSong: ISongWithId;
  playlist: ISongWithId[];
  audio: HTMLAudioElement;
  onSetCurrentSong: (currentSong: ISongWithId) => void;
  onSetIsPlaying: (isPlaying: boolean) => void;
  onSongDurationSliderMove: (duration: number) => void;
  onSongDurationSliderRelease: (duration: number) => void;
  isLoadingSong: boolean;
  isPlaying: boolean;
  currentDuration: number;
  totalDuration: number;
}

export const DesktopPlayer: React.FC<IProps> = ({
  currentSong,
  playlist,
  audio,
  onSetCurrentSong,
  onSetIsPlaying,
  isPlaying,
  isLoadingSong,
  currentDuration,
  totalDuration,
  onSongDurationSliderMove,
  onSongDurationSliderRelease,
}) => {
  const [volume, setVolume] = useState(100);

  const renderVolumeManager = () => {
    return (
      <div className="flex justify-end items-center gap-1">
        <div className="w-3/5 gap-1 flex items-center">
          <IconButton variant="transparent" size="small">
            <VolumeIcon size={16} />
          </IconButton>
          <div className="w-full">
            <ProgressBar
              max={100}
              value={volume}
              onInput={(value) => {
                setVolume(value);
                audio.volume = value / 100;
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderPlayer = () => {
    return (
      <div className="flex flex-col w-full justify-center">
        <Space size="small" className="justify-center">
          <IconButton
            size="small"
            variant="transparent"
            onClick={() =>
              handleRewind({
                playlist,
                currentSong,
                audio,
                onSetCurrentSong,
                onSetIsPlaying,
              })
            }
          >
            <RewindIcon size={16} />
          </IconButton>
          <PlayButton
            isLoadingSong={isLoadingSong}
            isPlaying={isPlaying}
            audio={audio}
            onSetIsPlaying={onSetIsPlaying}
          />
          <IconButton
            size="small"
            variant="transparent"
            onClick={() =>
              handleFastForward({
                playlist,
                currentSong,
                audio,
                onSetCurrentSong,
                onSetIsPlaying,
              })
            }
          >
            <FastForwardIcon size={16} />
          </IconButton>
        </Space>
        <div className="mt-1 flex gap-2 items-center font-light text-secondary50">
          <span className="text-xxs">{calculateTime(currentDuration)}</span>
          <div className="w-full">
            <SongDurationSlider
              totalDuration={totalDuration}
              currentDuration={currentDuration}
              onInput={onSongDurationSliderMove}
              onChange={onSongDurationSliderRelease}
            />
          </div>
          <span className="text-xxs">{calculateTime(totalDuration)}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="hidden lg:grid grid-cols-[3fr_6fr_3fr] gap-x-3">
      <MusicInfo currentSong={currentSong} />
      {renderPlayer()}
      {renderVolumeManager()}
    </div>
  );
};
