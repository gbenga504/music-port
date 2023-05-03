import type { ILoadData } from "../../../utils/routeUtils";

export interface IPageQuery {
  currentPage: string;
  pageSize: string;
  limit: string;
  genre?: string;
  isAuthTokenAvailableForCreatingPlaylist?: string;
  platform?: string;
  isAuthTokenAvailableForConvertingPlaylist?: string;
  selectedPlaylistId?: string;
}

export async function loadData({ api, query }: ILoadData<IPageQuery>) {
  const { genre, currentPage = "1", limit = "10" } = query;

  const playlists = await api.playlist.getPlaylists({
    genre: genre ?? null,
    currentPage: Number(currentPage),
    pageSize: Number(limit),
  });

  return { playlists };
}
