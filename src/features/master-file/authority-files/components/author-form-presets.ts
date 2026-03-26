import { z } from "zod";

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

export type AuthorTypeOption = (typeof AUTHOR_TYPE_OPTIONS)[number]["value"];

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

export const authorFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name wajib diisi")
    .max(120, "Name maksimal 120 karakter"),
  birthYear: z
    .string()
    .trim()
    .max(4, "Birth Year maksimal 4 karakter")
    .refine((value) => value.length === 0 || /^\d{4}$/.test(value), {
      message: "Birth Year harus 4 digit",
    }),
  type: z.enum(["personal-name", "organizational-body", "conference"], {
    errorMap: () => ({ message: "Type wajib dipilih" }),
  }),
  files: z.string().trim().max(120, "Files maksimal 120 karakter"),
});

export type AuthorFormData = z.infer<typeof authorFormSchema>;
export type AuthorFormInitialState = AuthorFormData;

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
