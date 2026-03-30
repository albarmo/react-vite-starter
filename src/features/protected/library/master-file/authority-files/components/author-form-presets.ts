import type {
  AuthorFormInitialState,
  AuthorTypeOption,
} from "@/features/protected/library/master-file/authority-files/types/author.types";

export const AUTHOR_TYPE_OPTIONS = [
  {
    value: "personal-name",
    label: "Personal Name",
  },
  {
    value: "organizational-body",
    label: "Organizational Body",
  },
  {
    value: "conference",
    label: "Conference",
  },
] as const;

const AUTHOR_FORM_PRESET_RECORDS = [
  {
    name: "Gunawan",
    birthYear: "",
    type: "personal-name" as AuthorTypeOption,
    files: "",
  },
  {
    name: "Orphan Author",
    birthYear: "",
    type: "organizational-body" as AuthorTypeOption,
    files: "",
  },
] as const;

export const CREATE_AUTHOR_FORM_INITIAL_STATE: AuthorFormInitialState = {
  name: "",
  birthYear: "",
  type: "personal-name",
  files: "",
};

export function getEditAuthorFormInitialState(
  id: string,
): AuthorFormInitialState {
  const matchedIndex = Number.parseInt(id.replace(/^author-/, ""), 10);
  const safeIndex =
    Number.isFinite(matchedIndex) && matchedIndex > 0 ? matchedIndex - 1 : 0;
  const preset =
    AUTHOR_FORM_PRESET_RECORDS[safeIndex % AUTHOR_FORM_PRESET_RECORDS.length] ??
    AUTHOR_FORM_PRESET_RECORDS[0];

  return { ...preset };
}
