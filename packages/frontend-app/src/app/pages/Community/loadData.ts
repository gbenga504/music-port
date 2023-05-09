import { constructURL } from "../../../utils/url";
import { RedirectError } from "../../../errors/redirect-error";
import type { ILoadData } from "../../../utils/routeUtils";
import { routeIds } from "../../routes";

export interface IPageQuery {
  // General
  currentPage: string;
  pageSize: string;

  // Create playlist
  genre?: string;
  isAuthTokenAvailableForCreatingPlaylist?: string;
  author?: string;
  playlistLink?: string;
  playlistGenre?: string;
  streamingService?: string;

  // Convert playlist
  platform?: string;
  isAuthTokenAvailableForConvertingPlaylist?: string;
  selectedPlaylistId?: string;
}

export async function loadData({ api, query }: ILoadData<IPageQuery>) {
  const { genre, currentPage, pageSize } = query;

  if (!currentPage || !pageSize) {
    throw new RedirectError({
      url: constructURL({
        routeId: routeIds.community,
        query: {
          currentPage: "1",
          pageSize: "10",
        },
      }),
    });
  }

  const playlists = await api.playlist.getPlaylists({
    genre: genre ?? null,
    currentPage: Number(currentPage),
    pageSize: Number(pageSize),
  });

  return { playlists };
}
