import { z } from "zod";

export type DocLanguagePresetRecord = {
  id: string;
  language: string;
  updatedAt: string;
};

export const DOC_LANGUAGE_PRESET_RECORDS: DocLanguagePresetRecord[] = [
  {
    id: "doc-language-1",
    language: "English",
    updatedAt: "28 Feb 2026",
  },
  {
    id: "doc-language-2",
    language: "Indonesian",
    updatedAt: "28 Feb 2026",
  },
];

export const docLanguageFormSchema = z.object({
  language: z
    .string()
    .trim()
    .min(1, "Language wajib diisi")
    .max(120, "Language maksimal 120 karakter"),
});

export type DocLanguageFormData = z.infer<typeof docLanguageFormSchema>;
export type DocLanguageFormInitialState = DocLanguageFormData;

export const CREATE_DOC_LANGUAGE_FORM_INITIAL_STATE: DocLanguageFormInitialState =
  {
    language: "",
  };

export function getEditDocLanguageFormInitialState(
  id: string,
): DocLanguageFormInitialState {
  const preset =
    DOC_LANGUAGE_PRESET_RECORDS.find((record) => record.id === id) ??
    DOC_LANGUAGE_PRESET_RECORDS[0];

  return {
    language: preset.language,
  };
}
