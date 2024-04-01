import loadable from "@loadable/component";
import { useContext, createContext, useState, useMemo } from "react";
import React from "react";

import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useToast } from "../Toast/ToastContext";

import type { IProps as IPlayerProps } from "./Player";
import type { ReactNode } from "react";

type Playlist = IPlayerProps["playlist"];

interface IContextValue {
  onChangePlaylist: (playlist: Playlist) => void;
  playlist: Playlist | null;
}

const PlayerContext = createContext<IContextValue>({
  onChangePlaylist: () => null,
  playlist: null,
});

const PlayerWrapper = loadable(() => import("./PlayerWrapper"), {
  ssr: false,
  fallback: undefined,
  resolveComponent: (components) => components.PlayerWrapper,
});

export const usePlayer = () => {
  return useContext(PlayerContext);
};

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const toast = useToast();
  const [previouslySavedPlaylist, setPreviouslySavedPlaylist] =
    useLocalStorage<Playlist | null>("playlist", null);
  const [playlist, setPlaylist] = useState<Playlist | null>(
    previouslySavedPlaylist
  );

  const removeSongsWithoutPreviewURL = (playlist: Playlist): Playlist => {
    return playlist.filter((song) => {
      return Boolean(song.previewURL);
    });
  };

  const handleChangePlaylist = (playlist: Playlist): void => {
    const validPlaylist = removeSongsWithoutPreviewURL(playlist);

    if (validPlaylist.length === 0) {
      return toast({
        description: "Cannot play playlist",
        status: "warning",
      });
    }

    setPlaylist(playlist);
    setPreviouslySavedPlaylist(playlist);
  };

  const memoizedContextValue = useMemo<IContextValue>(() => {
    return {
      playlist,
      onChangePlaylist: handleChangePlaylist,
    };
  }, [playlist]);

  return (
    <PlayerContext.Provider value={memoizedContextValue}>
      {children}
      <PlayerWrapper playlist={playlist} />
    </PlayerContext.Provider>
  );
};
