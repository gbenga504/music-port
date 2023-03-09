import type { ILoadData } from "../../../../utils/routeUtils";

export async function loadData({ api, params }: ILoadData) {
  return api.playlist.getPlaylistByExportId({
    exportId: params.id,
  });
}
