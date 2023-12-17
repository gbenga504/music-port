import type { ILoadData } from "../../../../utils/route-utils";

export interface IPageQuery {}

export async function loadData({ api }: ILoadData) {
  const featuredPlaylists = await api.playlist.getFeaturedPlaylists();

  return { featuredPlaylists };
}

export type PageData = Awaited<ReturnType<typeof loadData>>;
