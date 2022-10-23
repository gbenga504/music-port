import type { ILoadData, IPageDatas } from "../../utils/routeUtils";

export async function loadData({ api }: ILoadData): Promise<IPageDatas> {
  return { status: "Loading...", api };
}
