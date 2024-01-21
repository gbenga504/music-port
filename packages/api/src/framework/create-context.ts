import { AdminAuthTokenRepository } from "../admin-auth-token/repository";
import { AdminAuthTokenService } from "../admin-auth-token/service";
import { ConversionRepository } from "../conversion/repository";
import { ConversionService } from "../conversion/service";
import { PlaylistRepository } from "../playlist/repository";
import { PlaylistService } from "../playlist/service";
import { PlaylistGenreRepository } from "../playlist-genre/repository";
import { PlaylistGenreService } from "../playlist-genre/service";

export function createContext() {
  // Conversion
  const conversionRepository = new ConversionRepository();
  const conversionService = new ConversionService({ conversionRepository });

  // Admin auth token
  const adminAuthTokenRepository = new AdminAuthTokenRepository();
  const adminAuthTokenService = new AdminAuthTokenService({
    adminAuthTokenRepository,
  });

  // Playlist genre
  const playlistGenreRepository = new PlaylistGenreRepository();
  const playlistGenreService = new PlaylistGenreService({
    playlistGenreRepository,
  });

  // Playlist
  const playlistRepository = new PlaylistRepository();
  const playlistService = new PlaylistService({
    playlistRepository,
    adminAuthTokenService,
    conversionService,
    playlistGenreRepository,
  });

  return {
    playlistGenreService,
    playlistGenreRepository,

    playlistService,
    playlistRepository,

    adminAuthTokenService,
    adminAuthTokenRepository,

    conversionService,
    conversionRepository,
  };
}
