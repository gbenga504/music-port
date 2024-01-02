import classNames from "classnames";
import React from "react";

import { handleTogglePlayMode } from "./utils";

import { IconButton } from "../IconButton/IconButton";
import { PauseIcon, PlayIcon } from "../icons";

interface IProps {
  isMobile?: boolean;
  isLoadingSong: boolean;
  isPlaying: boolean;
  audio: HTMLAudioElement;
  onSetIsPlaying: (isPlaying: boolean) => void;
}

export const PlayButton: React.FC<IProps> = ({
  isMobile,
  isLoadingSong,
  isPlaying,
  audio,
  onSetIsPlaying,
}) => {
  return (
    <div className="relative w-[40px] h-[40px] flex justify-center items-center">
      {isLoadingSong && (
        <div
          className={classNames(
            "w-full h-full absolute border-transparent rounded-full",
            "border-2 border-t-white animate-spin"
          )}
        />
      )}
      <IconButton
        size="medium"
        variant={isMobile ? "transparent" : "contained"}
        color="white"
        onClick={() =>
          handleTogglePlayMode({
            isPlaying,
            isLoadingSong,
            audio,
            onSetIsPlaying,
          })
        }
      >
        {isPlaying ? (
          <PauseIcon
            size={16}
            fillColorClassName={isMobile ? "fill-white" : undefined}
          />
        ) : (
          <PlayIcon
            size={16}
            fillColorClassName={isMobile ? "fill-white" : undefined}
          />
        )}
      </IconButton>
    </div>
  );
};
