import type { PlatformType } from "../../utils/platform";
import type { DocumentId } from "../helper";

export interface IConversion {
  _id: DocumentId;
  importLink: string;
  exportLink: string;
  toPlatform: PlatformType;
  playlist?: DocumentId;
}
