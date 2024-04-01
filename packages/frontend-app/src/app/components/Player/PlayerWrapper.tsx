import React from "react";

import { Player } from "./Player";

import type { IProps as IPlayerProps } from "./Player";

export const PlayerWrapper: React.FC<{
  playlist: IPlayerProps["playlist"] | null;
}> = ({ playlist }) => {
  return (
    playlist && (
      <div className="fixed bottom-0 z-10 left-0 w-full bg-[rgba(44,44,44,0.4)] backdrop-blur md:bg-secondary200 md:backdrop-blur-0 p-3">
        <Player playlist={playlist} />
      </div>
    )
  );
};
