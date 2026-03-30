import { z } from "zod";

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
  relatedTerm: z.string().trim().min(1, "Related Term wajib dipilih"),
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
