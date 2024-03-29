import { useContext, createContext, useState, useMemo, useEffect } from "react";
import React from "react";

import { Player } from "./Player";

import { useLocalStorage } from "../../hooks/useLocalStorage";
import useSsr from "../../hooks/useSsr";
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

export const usePlayer = () => {
  return useContext(PlayerContext);
};

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const toast = useToast();
  const isBrowser = useSsr();

  // if (typeof window === undefined) {
  //   return null;
  // }

  // const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [playlist, setPlaylist] = isBrowser
    ? useLocalStorage<Playlist | null>("playlist", null)
    : useState<Playlist | null>(null);

  const removeSongsWithoutPreviewURL = (playlist: Playlist): Playlist => {
    return playlist.filter((song) => {
      return Boolean(song.previewURL);
    });
  };

  useEffect(() => {
    if (!isBrowser) {
      setPlaylist(null);
    }
  }, [isBrowser]);

  const handleChangePlaylist = (playlist: Playlist): void => {
    const validPlaylist = removeSongsWithoutPreviewURL(playlist);

    if (validPlaylist.length === 0) {
      return toast({
        description: "Cannot play playlist",
        status: "warning",
      });
    }

    setPlaylist(playlist);
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
      {playlist !== null && (
        <div className="fixed bottom-0 z-10 left-0 w-full bg-[rgba(44,44,44,0.4)] backdrop-blur md:bg-secondary200 md:backdrop-blur-0 p-3">
          <Player playlist={playlist} />
        </div>
      )}
    </PlayerContext.Provider>
  );
};
