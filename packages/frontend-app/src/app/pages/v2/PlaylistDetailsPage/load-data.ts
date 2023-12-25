import { NotFoundError } from "../../../../errors/not-found-error";

import type { ILoadData } from "../../../../utils/route-utils";

export interface IPageParams {
  id: string;
}

export async function loadData({
  api,
  params,
}: ILoadData<unknown, IPageParams>) {
  const { id } = params;
  const playlistById = await api.playlist.getPlaylistsById({ id });

  if (!playlistById) {
    throw new NotFoundError();
  }

  return { playlistById };
}

export type PageData = Awaited<ReturnType<typeof loadData>>;
