import type { ILoadData } from "../../../utils/routeUtils";

export async function loadData({ api, query }: ILoadData) {
  const { genre, currentPage = "1", limit = "10" } = query;

  const playlists = await api.playlist.getPlaylists({
    genre: genre ?? null,
    currentPage: Number(currentPage),
    pageSize: Number(limit),
  });

  return { playlists };
}
