import { z, ZodError } from "zod";

const importMusicSchema = z.object({
  link: z.string().url(),
});

export type importMusicFormInputs = z.infer<typeof importMusicSchema>;

export const parseFormInputsForImportMusic = (input: {
  link: string;
}): z.output<typeof importMusicSchema> => {
  return importMusicSchema.parse(input);
};

export const validateFormInputsForImportMusic = (input: {
  link: string;
}): { [key: string]: string } => {
  try {
    parseFormInputsForImportMusic(input);

    return {};
  } catch (error) {
    let formattedError: { [key: string]: { _errors: string[] } } = {};

    if (error instanceof ZodError) {
      formattedError = error.format() as unknown as {
        [key: string]: { _errors: string[] };
      };
    }

    return Object.keys(formattedError).reduce(
      (acc: { [key: string]: string }, field) => {
        if (field in input) {
          acc[field] = formattedError[field]._errors[0];
        }
        return acc;
      },
      {},
    );
  }
};
