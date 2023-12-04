import React from "react";

import { MusicInfo } from "./MusicInfo";
import { PlayButton } from "./PlayButton";
import { SongDurationSlider } from "./SongDurationSlider";

import type { ISongWithId } from "./utils";

interface IProps {
  currentSong: ISongWithId;
  isLoadingSong: boolean;
  isPlaying: boolean;
  audio: HTMLAudioElement;
  onSetIsPlaying: (isPlaying: boolean) => void;
  currentDuration: number;
  totalDuration: number;
  onSongDurationSliderMove: (duration: number) => void;
  onSongDurationSliderRelease: (duration: number) => void;
}

export const MobilePlayer: React.FC<IProps> = ({
  currentSong,
  isLoadingSong,
  isPlaying,
  audio,
  onSetIsPlaying,
  totalDuration,
  currentDuration,
  onSongDurationSliderMove,
  onSongDurationSliderRelease,
}) => {
  return (
    <div className="block lg:hidden relative p-1 pb-4">
      <div className="flex justify-between items-center">
        <MusicInfo currentSong={currentSong} />
        <PlayButton
          isMobile
          isLoadingSong={isLoadingSong}
          isPlaying={isPlaying}
          audio={audio}
          onSetIsPlaying={onSetIsPlaying}
        />
      </div>
      <div className="absolute bottom-0 left-0 w-full">
        <SongDurationSlider
          isMobile
          totalDuration={totalDuration}
          currentDuration={currentDuration}
          onInput={onSongDurationSliderMove}
          onChange={onSongDurationSliderRelease}
        />
      </div>
    </div>
  );
};
