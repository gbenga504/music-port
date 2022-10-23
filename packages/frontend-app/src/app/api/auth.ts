import type { IBaseClientParams } from "./types";

export const auth = ({ httpClientForBackend }: IBaseClientParams) => {
  console.log("For now we console log to prevent errors", httpClientForBackend);

  return {};
};
