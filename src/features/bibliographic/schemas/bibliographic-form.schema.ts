import { z } from "zod";

const MAX_ATTACHMENT_SIZE = 10 * 1024 * 1024;

const emptyOrDigitsSchema = z.string().refine(
  (value) => value === "" || /^\d+$/.test(value),
  "Harus berupa angka",
);

const emptyOrYearSchema = z.string().refine(
  (value) => value === "" || /^\d{4}$/.test(value),
  "Tahun harus 4 digit",
);

const emptyOrUrlSchema = z.string().refine((value) => {
  if (value.trim() === "") {
    return true;
  }

  return z.string().url().safeParse(value).success;
}, "URL tidak valid");

function hasContent(value: string) {
  return value.trim() !== "";
}

export const bibliographicAuthorEntrySchema = z
  .object({
    id: z.string(),
    name: z.string(),
    authorType: z.string(),
    classification: z.string(),
  })
  .superRefine((value, ctx) => {
    const hasAnyValue = [
      value.name,
      value.authorType,
      value.classification,
    ].some(hasContent);

    if (!hasAnyValue) {
      return;
    }

    if (!hasContent(value.name)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["name"],
        message: "Author name wajib diisi",
      });
    }

    if (!hasContent(value.authorType)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["authorType"],
        message: "Author type wajib dipilih",
      });
    }

    if (!hasContent(value.classification)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["classification"],
        message: "Classification wajib dipilih",
      });
    }
  });

export const bibliographicSubjectEntrySchema = z
  .object({
    id: z.string(),
    subject: z.string(),
    subjectType: z.string(),
    classification: z.string(),
  })
  .superRefine((value, ctx) => {
    const hasAnyValue = [
      value.subject,
      value.subjectType,
      value.classification,
    ].some(hasContent);

    if (!hasAnyValue) {
      return;
    }

    if (!hasContent(value.subject)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["subject"],
        message: "Subject wajib diisi",
      });
    }

    if (!hasContent(value.subjectType)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["subjectType"],
        message: "Subject type wajib dipilih",
      });
    }

    if (!hasContent(value.classification)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["classification"],
        message: "Classification wajib dipilih",
      });
    }
  });

export const bibliographicLabelEntrySchema = z.object({
  id: z.string(),
  label: z.string(),
  icon: z.enum(["heart", "play"]),
  checked: z.boolean(),
  url: emptyOrUrlSchema,
});

export const bibliographicAttachmentPreviewSchema = z.object({
  name: z.string().min(1, "Nama file wajib diisi"),
  size: z
    .number()
    .nonnegative("Ukuran file tidak valid")
    .max(MAX_ATTACHMENT_SIZE, "Ukuran file maksimal 10 MB"),
});

export const bibliographicFormValuesSchema = z.object({
  title: z.string().trim().min(1, "Title wajib diisi"),
  statementOfResponsibility: z.string(),
  edition: z.string(),
  specificDetailInfo: z.string(),
  itemCodeBatchGenerator: z.string(),
  totalItems: emptyOrDigitsSchema,
  gmd: z.string(),
  contentType: z.string(),
  mediaType: z.string(),
  carrierType: z.string(),
  frequency: z.string(),
  isbnIssn: emptyOrDigitsSchema,
  publisher: z.string(),
  publishingYear: emptyOrYearSchema,
  publisherPlace: z.string(),
  collation: z.string(),
  seriesTitle: z.string(),
  classification: z.string(),
  callNumber: z.string(),
  relatedBiblioData: z.string(),
  language: z.string(),
  abstractNotes: z.string(),
  hideInOpac: z.enum(["show", "hide"]),
  promoteToHomepage: z.enum(["dont-promote", "promote"]),
});

export const bibliographicFormSchema = bibliographicFormValuesSchema.extend({
  authors: z.array(bibliographicAuthorEntrySchema).min(1),
  subjects: z.array(bibliographicSubjectEntrySchema).min(1),
  labels: z.array(bibliographicLabelEntrySchema),
  attachment: bibliographicAttachmentPreviewSchema.nullable(),
});
