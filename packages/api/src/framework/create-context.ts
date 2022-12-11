import { PlaylistRepository } from "../playlist/repository";
import { PlaylistService } from "../playlist/service";

export function createContext() {
  // Playlist
  const playlistRepository = new PlaylistRepository();
  const playlistService = new PlaylistService({ playlistRepository });

  return {
    playlistService,
    playlistRepository,
  };
}
