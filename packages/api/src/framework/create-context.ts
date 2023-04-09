import { PlaylistRepository } from "../playlist/repository";
import { PlaylistService } from "../playlist/service";
import { AdminAuthTokenRepository } from "../admin-auth-token/repository";
import { AdminAuthTokenService } from "../admin-auth-token/service";

export function createContext() {
  // Playlist
  const playlistRepository = new PlaylistRepository();
  const playlistService = new PlaylistService({ playlistRepository });

  // Admin auth token
  const adminAuthTokenRepository = new AdminAuthTokenRepository();
  const adminAuthTokenService = new AdminAuthTokenService({
    adminAuthTokenRepository,
  });

  return {
    playlistService,
    playlistRepository,

    adminAuthTokenService,
    adminAuthTokenRepository,
  };
}
