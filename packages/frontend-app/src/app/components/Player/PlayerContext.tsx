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
  const [playlist, setPlaylist] = useState<Playlist | null>([
    {
      name: "For Tonight",
      artists: ["Giveon"],
      duration: 3000,
      previewURL:
        "https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample.mp3",
      coverImage:
        "https://images.prismic.io/wunderflatscontent/ef754f0d-5903-40b7-a1d6-ea143f480f37_Balcony-M.jpg?auto=compress,format",
    },
  ]);

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
