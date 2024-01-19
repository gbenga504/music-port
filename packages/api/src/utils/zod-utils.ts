import { ObjectId } from "mongodb";
import { z } from "zod";

export const stringOrObjectId = z.union([
  z.instanceof(ObjectId),
  z
    .string()
    .refine((arg: string) => {
      return ObjectId.isValid(arg);
    }, "Input is not an instanceOf ObjectId")
    .transform((arg): ObjectId => {
      return new ObjectId(arg);
    }),
]);
