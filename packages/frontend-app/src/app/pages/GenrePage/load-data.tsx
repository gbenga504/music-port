import type { ILoadData } from "../../../utils/route-utils";

export interface IPageParams {
  id: string;
}

export async function loadData({
  api,
  params,
}: ILoadData<unknown, IPageParams>) {
  const playlistsByGenre = await api.playlist.getPlaylistsByGenre({
    genreId: params.id,
  });

  return { playlistsByGenre };
}

export type PageData = Awaited<ReturnType<typeof loadData>>;
