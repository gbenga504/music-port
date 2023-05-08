import { constructURL } from "../../../utils/url";
import { RedirectError } from "../../../errors/redirect-error";
import type { ILoadData } from "../../../utils/routeUtils";
import { routeIds } from "../../routes";

export interface IPageQuery {
  currentPage: string;
  pageSize: string;
  genre?: string;
  isAuthTokenAvailableForCreatingPlaylist?: string;
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
