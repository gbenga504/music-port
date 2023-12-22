import { z } from "zod";

import {
  PlaylistGenreValues,
  PlaylistPlatformValues,
} from "../../../utils/platform";

import type { ObjectValues } from "../../../types/types";
import type { PlaylistPlatform } from "../../api/graphql/graphql-client.gen";
import type { PlaylistGenre } from "../../api/graphql/graphql-client.gen";

export const REVIEW_ACTION = {
  CREATE_PLAYLIST: "CREATE_PLAYLIST",
} as const;

export const ReviewActionValues = Object.values(REVIEW_ACTION);
export type ReviewActionType = ObjectValues<typeof REVIEW_ACTION>;

const validateModalDataSchema = {
  [REVIEW_ACTION.CREATE_PLAYLIST]: z.object({
    author: z.string(),
    playlistLink: z.string(),
    playlistGenre: z.enum(
      PlaylistGenreValues as [PlaylistGenre, ...PlaylistGenre[]],
    ),
    streamingService: z.enum(
      PlaylistPlatformValues as [PlaylistPlatform, ...PlaylistPlatform[]],
    ),
  }),
} as const;

export type ValidateModalData<T extends ReviewActionType> = z.infer<
  (typeof validateModalDataSchema)[T]
>;

export function parseModalData<T extends ReviewActionType>(
  reviewAction: T,
  data: unknown,
): ValidateModalData<T> {
  return validateModalDataSchema[reviewAction].parse(data);
}
