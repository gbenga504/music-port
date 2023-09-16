import type { ILoadData } from "../../../utils/route-utils";

export interface IPageQuery {
  link?: string;
  fromPlatform?: string;
  toPlatform?: string;
  isAuthTokenAvailable?: string;
}

export async function loadData(_data: ILoadData) {
  return {};
}
