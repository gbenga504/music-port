import { useContext, createContext, useState, useMemo } from "react";
import React from "react";

import { Player } from "./Player";

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
  const [playlist, setPlaylist] = useState<Playlist | null>(null);

  const handleChangePlaylist = (playlist: Playlist): void => {
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
      {playlist && (
        <div className="fixed bottom-0 left-0 w-full bg-secondary200 p-3">
          <Player playlist={playlist} />
        </div>
      )}
    </PlayerContext.Provider>
  );
};
