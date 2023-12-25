import { GraphQLDate } from "graphql-iso-date";
import { asNexusMethod } from "nexus";

import type { GraphQLNamedType } from "graphql";

export const GQLDate = asNexusMethod(
  GraphQLDate as unknown as GraphQLNamedType,
  "date",
);
