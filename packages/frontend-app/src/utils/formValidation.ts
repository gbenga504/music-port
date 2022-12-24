import { z, ZodError } from "zod";

const formatError = (error: unknown, input: any): { [key: string]: string } => {
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
};

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
    return formatError(error, input);
  }
};

const pasteExportLinkFormSchema = z.object({
  link: z
    .string()
    .url()
    .regex(
      new RegExp(`^${process.env.FRONTEND_BASE_URL}/export/\\S+$`),
      "This URL is not recognized",
    ),
});

export type pasteExportLinkFormInputs = z.infer<
  typeof pasteExportLinkFormSchema
>;

export const parseFormInputsForPasteExportLink = (input: {
  link: string;
}): z.output<typeof pasteExportLinkFormSchema> => {
  return pasteExportLinkFormSchema.parse(input);
};

export const validateFormInputsForPasteExportLink = (input: {
  link: string;
}): { [key: string]: string } => {
  try {
    parseFormInputsForPasteExportLink(input);

    return {};
  } catch (error) {
    return formatError(error, input);
  }
};
