import { ZodError } from "zod";

export const formatError = (error: unknown): { [key: string]: string } => {
  let formattedError: { [key: string]: { _errors: string[] } } = {};

  if (error instanceof ZodError) {
    formattedError = error.format() as unknown as {
      [key: string]: { _errors: string[] };
    };
  }

  return Object.keys(formattedError).reduce(
    (acc: { [key: string]: string }, field) => {
      if (field && field !== "_errors") {
        acc[field] = formattedError[field]._errors[0];
      }

      return acc;
    },
    {},
  );
};
