import React, { useEffect, useState, useRef } from "react";

import { DesktopPlayer } from "./DesktopPlayer";
import { MobilePlayer } from "./MobilePlayer";
import { handleFastForward, handlePlay, handlePause } from "./utils";

import { useAttachUniqueIdToListItems } from "../../hooks/useAttachUniqueIdToListItems";

import type { ISong } from "./utils";

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

  const isSongDurationSliderActiveRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    function handleLoadedData() {
      setIsLoadingSong(false);
      setTotalDuration(Math.floor(audioRef.current?.duration || 0));
      handlePlay({ audio: audioRef.current!, onSetIsPlaying: setIsPlaying });
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
      handlePlay({ audio: audioRef.current!, onSetIsPlaying: setIsPlaying });

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
      handleFastForward({
        playlist,
        currentSong,
        audio: audioRef.current!,
        onSetCurrentSong: setCurrentSong,
        onSetIsPlaying: setIsPlaying,
      });
    }
  }, [currentDuration, totalDuration, currentDuration, playlist]);

  useEffect(() => {
    if (playlist) {
      // Stop the player before changing to the new playlist
      if (isPlaying) {
        handlePause({ audio: audioRef.current, onSetIsPlaying: setIsPlaying });
      }

      setCurrentSong(playlist[0]);
    }
  }, [playlist]);

  function handleSongDurationSliderMove(duration: number) {
    setCurrentDuration(duration);
    isSongDurationSliderActiveRef.current = true;
  }

  function handleSongDurationSliderRelease(duration: number) {
    setCurrentDuration(duration);

    isSongDurationSliderActiveRef.current = false;
    audioRef.current!.currentTime = duration;
  }

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
      <DesktopPlayer
        currentSong={currentSong}
        playlist={playlist}
        audio={audioRef.current!}
        onSetCurrentSong={setCurrentSong}
        onSetIsPlaying={setIsPlaying}
        onSongDurationSliderMove={handleSongDurationSliderMove}
        onSongDurationSliderRelease={handleSongDurationSliderRelease}
        isLoadingSong={isLoadingSong}
        isPlaying={isPlaying}
        currentDuration={currentDuration}
        totalDuration={totalDuration}
      />
      <MobilePlayer
        currentSong={currentSong}
        isLoadingSong={isLoadingSong}
        isPlaying={isPlaying}
        audio={audioRef.current!}
        onSetIsPlaying={setIsPlaying}
        currentDuration={currentDuration}
        totalDuration={totalDuration}
        onSongDurationSliderMove={handleSongDurationSliderMove}
        onSongDurationSliderRelease={handleSongDurationSliderRelease}
      />
    </footer>
  );
};
