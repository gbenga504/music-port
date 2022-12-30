import type { ILoadData, IPageDatas } from "../../../../utils/routeUtils";

export async function loadData({
  api,
  params,
}: ILoadData): Promise<IPageDatas> {
  return api.playlist.getPlaylistByExportId({
    exportId: params.id,
  });
}
