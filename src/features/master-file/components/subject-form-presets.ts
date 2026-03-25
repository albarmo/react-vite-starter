import { z } from "zod";

export const SUBJECT_TYPE_OPTIONS = [
  {
    value: "topic",
    label: "Topic",
  },
  {
    value: "geographic",
    label: "Geographic",
  },
  {
    value: "name",
    label: "Name",
  },
  {
    value: "temporal",
    label: "Temporal",
  },
  {
    value: "occupation",
    label: "Occupation",
  },
] as const;

export const RELATED_TERM_OPTIONS = [
  {
    value: "use",
    label: "Use",
  },
  {
    value: "use-for",
    label: "Use For",
  },
  {
    value: "broader-term",
    label: "Broader Term",
  },
  {
    value: "narrower-term",
    label: "Narrower Term",
  },
  {
    value: "related-term",
    label: "Related Term",
  },
  {
    value: "see-also",
    label: "See Also",
  },
] as const;

export const PAGE_SIZE_OPTIONS = [10, 20, 50] as const;

export type SubjectTypeOption = (typeof SUBJECT_TYPE_OPTIONS)[number]["value"];
export type RelatedTermOption = (typeof RELATED_TERM_OPTIONS)[number]["value"];

const subjectTypeSchema = z.enum([
  "topic",
  "geographic",
  "name",
  "temporal",
  "occupation",
]);

const relatedTermSchema = z.enum([
  "use",
  "use-for",
  "broader-term",
  "narrower-term",
  "related-term",
  "see-also",
]);

export const subjectVocabularyControlModalSchema = z.object({
  relatedTerm: z
    .string()
    .trim()
    .min(1, "Related Term wajib dipilih")
    .refine(
      (value) =>
        RELATED_TERM_OPTIONS.some((option) => option.value === value),
      {
        message: "Related Term wajib dipilih",
      },
    ),
  vocabulary: z
    .string()
    .trim()
    .min(1, "Vocabulary wajib diisi")
    .max(120, "Vocabulary maksimal 120 karakter"),
  classification: z
    .string()
    .trim()
    .max(120, "Classification maksimal 120 karakter"),
});

export const subjectVocabularyControlSchema = z.object({
  id: z.string().min(1),
  relatedTerm: relatedTermSchema,
  vocabulary: z
    .string()
    .trim()
    .min(1, "Vocabulary wajib diisi")
    .max(120, "Vocabulary maksimal 120 karakter"),
  classification: z
    .string()
    .trim()
    .max(120, "Classification maksimal 120 karakter"),
});

export const subjectFormSchema = z.object({
  subject: z
    .string()
    .trim()
    .min(1, "Subject wajib diisi")
    .max(120, "Subject maksimal 120 karakter"),
  classificationCode: z
    .string()
    .trim()
    .max(120, "Classification Code maksimal 120 karakter"),
  type: z.union([z.literal(""), subjectTypeSchema]),
  authorityFiles: z
    .string()
    .trim()
    .max(120, "Authority Files maksimal 120 karakter"),
  vocabularyControls: z.array(subjectVocabularyControlSchema),
});

export type SubjectVocabularyControlModalData = z.infer<
  typeof subjectVocabularyControlModalSchema
>;
export type SubjectVocabularyControl = z.infer<
  typeof subjectVocabularyControlSchema
>;
export type SubjectFormData = z.infer<typeof subjectFormSchema>;
export type SubjectFormInitialState = SubjectFormData;

const SUBJECT_FORM_PRESET_RECORDS = [
  {
    subject: "Andrea Hirata",
    classificationCode: "",
    type: "topic" as SubjectTypeOption,
    authorityFiles: "",
    vocabularyControls: [
      {
        id: "subject-vocabulary-control-1",
        relatedTerm: "use-for" as RelatedTermOption,
        vocabulary: "Computer",
        classification: "",
      },
    ],
  },
  {
    subject: "Computer",
    classificationCode: "asdasd",
    type: "topic" as SubjectTypeOption,
    authorityFiles: "fd",
    vocabularyControls: [
      {
        id: "subject-vocabulary-control-2",
        relatedTerm: "broader-term" as RelatedTermOption,
        vocabulary: "Information Technology",
        classification: "",
      },
      {
        id: "subject-vocabulary-control-3",
        relatedTerm: "related-term" as RelatedTermOption,
        vocabulary: "Database",
        classification: "",
      },
    ],
  },
  {
    subject: "Corruption",
    classificationCode: "",
    type: "topic" as SubjectTypeOption,
    authorityFiles: "",
    vocabularyControls: [],
  },
  {
    subject: "Database",
    classificationCode: "",
    type: "topic" as SubjectTypeOption,
    authorityFiles: "",
    vocabularyControls: [],
  },
  {
    subject: "Design",
    classificationCode: "",
    type: "topic" as SubjectTypeOption,
    authorityFiles: "",
    vocabularyControls: [],
  },
  {
    subject: "Development",
    classificationCode: "",
    type: "topic" as SubjectTypeOption,
    authorityFiles: "",
    vocabularyControls: [],
  },
  {
    subject: "Information",
    classificationCode: "",
    type: "topic" as SubjectTypeOption,
    authorityFiles: "",
    vocabularyControls: [],
  },
  {
    subject: "Library",
    classificationCode: "",
    type: "topic" as SubjectTypeOption,
    authorityFiles: "",
    vocabularyControls: [],
  },
  {
    subject: "Linux",
    classificationCode: "",
    type: "topic" as SubjectTypeOption,
    authorityFiles: "",
    vocabularyControls: [],
  },
  {
    subject: "Metadata",
    classificationCode: "",
    type: "topic" as SubjectTypeOption,
    authorityFiles: "",
    vocabularyControls: [],
  },
] as const;

export const CREATE_SUBJECT_FORM_INITIAL_STATE: SubjectFormInitialState = {
  subject: "",
  classificationCode: "",
  type: "",
  authorityFiles: "",
  vocabularyControls: [],
};

export function getEditSubjectFormInitialState(
  id: string,
): SubjectFormInitialState {
  const matchedIndex = Number.parseInt(id.replace(/^subject-/, ""), 10);
  const safeIndex =
    Number.isFinite(matchedIndex) && matchedIndex > 0 ? matchedIndex - 1 : 0;
  const preset =
    SUBJECT_FORM_PRESET_RECORDS[
      safeIndex % SUBJECT_FORM_PRESET_RECORDS.length
    ] ?? SUBJECT_FORM_PRESET_RECORDS[0];

  return {
    ...preset,
    vocabularyControls: preset.vocabularyControls.map((item) => ({ ...item })),
  };
}
