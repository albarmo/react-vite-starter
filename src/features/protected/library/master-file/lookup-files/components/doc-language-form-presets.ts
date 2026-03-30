import type {
  DocLanguageFormInitialState,
  DocLanguageRecord,
} from "@/features/protected/library/master-file/lookup-files/types/doc-language.types";

export const DOC_LANGUAGE_PRESET_RECORDS: DocLanguageRecord[] = [
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
