import { ObjectId } from "mongodb";
import { z } from "zod";

//
// Schemas
//
export const schemas = {
  stringOrObjectId: z.union([
    z.instanceof(ObjectId),
    z
      .string()
      .refine((arg: string) => {
        return ObjectId.isValid(arg);
      }, "Input is not an instanceOf ObjectId")
      .transform((arg): ObjectId => {
        return new ObjectId(arg);
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
