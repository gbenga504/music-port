import { AxiosInstance } from "axios";

export interface IBaseClientParams {
  httpClientForBackend: AxiosInstance;
  httpClientForFrontend: AxiosInstance;
}
