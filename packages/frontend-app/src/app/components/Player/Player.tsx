import classNames from "classnames";
import React, { useEffect, useState, useRef } from "react";

import { useAttachUniqueIdToListItems } from "../../hooks/useAttachUniqueIdToListItems";
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

interface ISong {
  coverImage: string;
  name: string;
  artists: string[];
  // This should be in seconds
  duration: number;
  previewURL?: string;
}

export interface IProps {
  playlist: ISong[];
}

export const Player: React.FC<IProps> = ({ playlist: playlistFromProps }) => {
  const playlist = useAttachUniqueIdToListItems(playlistFromProps);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(playlist[0]);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isLoadingSong, setIsLoadingSong] = useState(false);
  const [volume, setVolume] = useState(100);

  const isSongDurationSliderActiveRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    function handleLoadedData() {
      setIsLoadingSong(false);
      setTotalDuration(Math.floor(audioRef.current?.duration || 0));
      handlePlay();
    }

    function updateCurrentDuration() {
      if (!isSongDurationSliderActiveRef.current) {
        const currentDuration = Math.floor(audioRef.current?.currentTime || 0);
        setCurrentDuration(currentDuration);

        // The Audio stops playing if the duration has reached the total duration
        // We want to also update the UI to reflect this
        if (currentDuration === Math.floor(audioRef.current!.duration)) {
          setIsPlaying(false);
        }
      }
    }

    function handleLoadStart() {
      setIsLoadingSong(true);
    }

    if (currentSong) {
      // we attempt to play the song when the song changes and fail silently
      // if not possible. This way, the next song can start automatically
      handlePlay();

      setTotalDuration(Math.floor(audioRef.current?.duration || 0));

      audioRef.current?.addEventListener("loadstart", handleLoadStart);
      audioRef.current?.addEventListener("loadeddata", handleLoadedData);
      audioRef.current?.addEventListener("timeupdate", updateCurrentDuration);
    }

    return () => {
      audioRef.current?.removeEventListener("loadstart", handleLoadStart);
      audioRef.current?.removeEventListener("loadeddata", handleLoadedData);
      audioRef.current?.removeEventListener(
        "timeupdate",
        updateCurrentDuration
      );
    };
  }, [currentSong]);

  useEffect(() => {
    if (
      currentDuration === totalDuration &&
      currentDuration !== 0 &&
      !isSongDurationSliderActiveRef.current
    ) {
      handleFastForward();
    }
  }, [currentDuration, totalDuration]);

  useEffect(() => {
    if (playlist) {
      // Stop the player before changing to the new playlist
      if (isPlaying) {
        handlePause();
      }

      setCurrentSong(playlist[0]);
    }
  }, [playlist]);

  const getDisplayNameForArtists = (): string => {
    const artists = currentSong.artists || [];

    return artists.reduce((acc, artist, currentIndex) => {
      const spacer = currentIndex === artists.length - 1 ? "" : ", ";

      return (acc += `${artist}${spacer}`);
    }, "");
  };

  const calculateTime = (duration: number): string => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);

    const returnedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${returnedSeconds}`;
  };

  const handleFastForward = () => {
    const currentSongIndex = playlist.findIndex(
      (song) => song.id === currentSong.id
    );

    let nextSongIndex = currentSongIndex;

    if (currentSongIndex + 1 <= playlist.length - 1) {
      nextSongIndex = currentSongIndex + 1;
    }

    handlePause();
    audioRef.current!.currentTime = 0;
    setCurrentSong(playlist[nextSongIndex]);
  };

  const handleRewind = () => {
    const currentSongIndex = playlist.findIndex(
      (song) => song.id === currentSong.id
    );

    if (currentSongIndex !== 0 && currentDuration <= 2) {
      handlePause();
      audioRef.current!.currentTime = 0;
      setCurrentSong(playlist[currentSongIndex - 1]);

      return;
    }

    audioRef.current!.currentTime = 0;
  };

  const handlePlay = async () => {
    try {
      await audioRef.current?.play();

      setIsPlaying(true);
    } catch (error) {
      // @todo: Find a better way to handle this
      // so we don't mess up the logs
      console.warn(error);
    }
  };

  const handlePause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const handleTogglePlayMode = () => {
    // If the song is loading, we don't want to allow the user play or pause the song
    if (isLoadingSong) return;

    if (isPlaying) {
      return handlePause();
    }

    handlePlay();
  };

  const renderMusicInfo = () => {
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
            {getDisplayNameForArtists()}
          </span>
        </div>
      </Space>
    );
  };

  const renderSongDurationSlider = ({ isMobile }: { isMobile: boolean }) => {
    return (
      <ProgressBar
        max={totalDuration}
        value={currentDuration}
        hideThumb={isMobile}
        onInput={(duration) => {
          setCurrentDuration(duration);
          isSongDurationSliderActiveRef.current = true;
        }}
        onChange={(duration) => {
          setCurrentDuration(duration);

          isSongDurationSliderActiveRef.current = false;
          audioRef.current!.currentTime = duration;
        }}
      />
    );
  };

  const renderPlayButton = ({ isMobile }: { isMobile: boolean }) => {
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
          size="small"
          variant={isMobile ? "transparent" : "contained"}
          color="white"
          onClick={handleTogglePlayMode}
        >
          {isPlaying ? (
            <PauseIcon
              size={16}
              className={isMobile ? "fill-white" : undefined}
            />
          ) : (
            <PlayIcon
              size={16}
              className={isMobile ? "fill-white" : undefined}
            />
          )}
        </IconButton>
      </div>
    );
  };

  const renderPlayer = () => {
    return (
      <div className="flex flex-col w-full justify-center">
        <Space size="small" className="justify-center">
          <IconButton size="small" variant="transparent" onClick={handleRewind}>
            <RewindIcon size={16} />
          </IconButton>
          {renderPlayButton({ isMobile: false })}
          <IconButton
            size="small"
            variant="transparent"
            onClick={handleFastForward}
          >
            <FastForwardIcon size={16} />
          </IconButton>
        </Space>
        <div className="mt-1 flex gap-2 items-center font-light text-secondary50">
          <span className="text-xxs">{calculateTime(currentDuration)}</span>
          <div className="w-full">
            {renderSongDurationSlider({ isMobile: false })}
          </div>
          <span className="text-xxs">{calculateTime(totalDuration)}</span>
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
            <ProgressBar
              max={100}
              value={volume}
              onInput={(value) => {
                setVolume(value);
                audioRef.current!.volume = value / 100;
              }}
            />
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
    return (
      <div className="block lg:hidden relative p-1 pb-4">
        <div className="flex justify-between items-center">
          {renderMusicInfo()}
          {renderPlayButton({ isMobile: true })}
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          {renderSongDurationSlider({ isMobile: true })}
        </div>
      </div>
    );
  };

  return (
    <footer className="w-full">
      {playlist.map((song) => (
        <audio
          ref={song.id === currentSong.id ? audioRef : undefined}
          key={song.id}
          src={song.previewURL}
          preload="auto"
        />
      ))}
      {renderDesktopView()}
      {renderMobileView()}
    </footer>
  );
};
