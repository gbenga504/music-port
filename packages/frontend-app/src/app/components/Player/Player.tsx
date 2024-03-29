import React, { useEffect, useState, useRef } from "react";

import { DesktopPlayer } from "./DesktopPlayer";
import { MobilePlayer } from "./MobilePlayer";
import {
  handleFastForward,
  handlePause,
  handleAudioLoadedData,
  updateAudioCurrentDuration,
  loadAudioIfNotPossibleToPlay,
} from "./utils";

import { useAttachUniqueIdToListItems } from "../../hooks/useAttachUniqueIdToListItems";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import type { ISong } from "./utils";

export interface IProps {
  playlist: ISong[];
}

export const Player: React.FC<IProps> = ({ playlist: playlistFromProps }) => {
  const playlist = useAttachUniqueIdToListItems(playlistFromProps);
  const [isPlaying, setIsPlaying] = useState(false);
  // console.log(isPlaying, "isPlaying");
  const [currentSong, setCurrentSong] = useState(playlist[0]);
  // console.log(currentSong, "currentSong");
  const [currentDuration, setCurrentDuration] = useState(0);
  // console.log(currentDuration, "currentDuration");
  const [totalDuration, setTotalDuration] = useState(0);
  // console.log(totalDuration, "totalDuration");
  const [isLoadingSong, setIsLoadingSong] = useState(false);
  // const [storedSong, setStoredSong] = useLocalStorage<ISong & { id: string }>(
  //   "playlist",
  //   // playlist[0]
  //   currentSong
  // );

  // if (window === undefined) {
  //   return null;
  // }

  // console.log(storedSong, "stored");

  const isSongDurationSliderActiveRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // useEffect(() => {
  //   if (storedSong !== null) {
  //     setCurrentSong(storedSong);
  //   }
  // }, [storedSong]);

  // useEffect(() => {
  //   setStoredSong(currentSong);
  // }, [currentSong]);

  useEffect(() => {
    async function handleLoadedData() {
      handleAudioLoadedData({
        audio: audioRef.current!,
        onSetTotalDuration: setTotalDuration,
        onSetIsLoadingSong: setIsLoadingSong,
        onSetIsPlaying: setIsPlaying,
      });
    }

    function updateCurrentDuration() {
      updateAudioCurrentDuration({
        isSongDurationSliderActive: isSongDurationSliderActiveRef.current,
        onSetCurrentDuration: setCurrentDuration,
        audio: audioRef.current,
        onSetIsPlaying: setIsPlaying,
      });
    }

    function handleLoadStart() {
      setIsLoadingSong(true);
    }

    if (currentSong) {
      setTotalDuration(Math.floor(audioRef.current?.duration || 0));

      audioRef.current?.addEventListener("loadstart", handleLoadStart);
      audioRef.current?.addEventListener("loadeddata", handleLoadedData);
      audioRef.current?.addEventListener("timeupdate", updateCurrentDuration);

      loadAudioIfNotPossibleToPlay({
        audio: audioRef.current!,
        onSetIsPlaying: setIsPlaying,
        currentSongId: currentSong.id,
        playlist,
      });
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
          src={song.previewURL ?? undefined}
          preload="none"
          id={song.id}
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
