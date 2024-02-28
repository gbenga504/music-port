import { z } from "zod";

import { DocumentId } from "../models/helper";

//
// Schemas
//
export const schemas = {
  stringOrDocumentId: z.union([
    z.instanceof(DocumentId),
    z
      .string()
      .refine((arg: string) => {
        return DocumentId.isValid(arg);
      }, "Input is not an instanceOf DocumentId")
      .transform((arg): DocumentId => {
        return new DocumentId(arg);
      }),
  ]),
};

//
// Transformers
//
export const transformers = {
  trim(input: string): string {
    return input.trim();
  },
};

//
// Refinements
//
export const refinements = {
  lengthIsLessThan(max: number) {
    return function (input: string): boolean {
      return input.length < max;
    };
  },
};
