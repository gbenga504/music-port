import type { ILoadData } from "../../../../utils/route-utils";
import type { PlaylistGenre } from "../../../api/graphql/graphql-client.gen";

export interface IPageParams {
  genre: PlaylistGenre;
}

export async function loadData({
  api,
  params,
}: ILoadData<unknown, IPageParams>) {
  const playlistsByGenre = await api.playlist.getPlaylistsByGenre({
    genre: params.genre,
  });

  return { playlistsByGenre };
}

export type PageData = Awaited<ReturnType<typeof loadData>>;
