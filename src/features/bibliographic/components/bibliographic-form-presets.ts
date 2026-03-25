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

export type BibliographicFormAuthorEntry = z.infer<
  typeof bibliographicAuthorEntrySchema
>;
export type BibliographicFormSubjectEntry = z.infer<
  typeof bibliographicSubjectEntrySchema
>;
export type BibliographicFormLabelEntry = z.infer<
  typeof bibliographicLabelEntrySchema
>;
export type BibliographicAttachmentPreview = z.infer<
  typeof bibliographicAttachmentPreviewSchema
>;
export type BibliographicFormValues = z.infer<
  typeof bibliographicFormValuesSchema
>;
export type BibliographicFormData = z.infer<typeof bibliographicFormSchema>;
export type BibliographicFormInitialState = BibliographicFormData;

const EMPTY_FORM_VALUES: BibliographicFormValues = {
  title: "",
  statementOfResponsibility: "",
  edition: "",
  specificDetailInfo: "",
  itemCodeBatchGenerator: "",
  totalItems: "",
  gmd: "",
  contentType: "",
  mediaType: "",
  carrierType: "",
  frequency: "",
  isbnIssn: "",
  publisher: "",
  publishingYear: "",
  publisherPlace: "",
  collation: "",
  seriesTitle: "",
  classification: "",
  callNumber: "",
  relatedBiblioData: "",
  language: "",
  abstractNotes: "",
  hideInOpac: "show",
  promoteToHomepage: "dont-promote",
};

const FILLED_FORM_VALUES: BibliographicFormValues = {
  title: "The Let Them Theory",
  statementOfResponsibility: "",
  edition: "",
  specificDetailInfo: "",
  itemCodeBatchGenerator: "p00000s",
  totalItems: "5",
  gmd: "text",
  contentType: "",
  mediaType: "",
  carrierType: "",
  frequency: "",
  isbnIssn: "625221049",
  publisher: "gramedia",
  publishingYear: "2025",
  publisherPlace: "",
  collation: "",
  seriesTitle: "",
  classification: "",
  callNumber: "",
  relatedBiblioData: "direct-source",
  language: "indonesia",
  abstractNotes:
    "Let Them; dua kata sederhana yang mengajak kita melepaskan hal-hal di luar kendali, agar energi hidup bisa fokus pada pilihan, tujuan, dan kebahagiaan yang benar-benar ingin dibangun.",
  hideInOpac: "show",
  promoteToHomepage: "promote",
};

export const CREATE_BIBLIOGRAPHIC_FORM_INITIAL_STATE: BibliographicFormInitialState =
  {
    ...EMPTY_FORM_VALUES,
    authors: [
      {
        id: "author-initial-1",
        name: "",
        authorType: "",
        classification: "",
      },
    ],
    subjects: [
      {
        id: "subject-initial-1",
        subject: "",
        subjectType: "",
        classification: "",
      },
    ],
    labels: [
      {
        id: "new-title",
        label: "New Title",
        icon: "heart",
        checked: false,
        url: "",
      },
      {
        id: "favorite-title",
        label: "Favorite Title",
        icon: "heart",
        checked: true,
        url: "",
      },
      {
        id: "multimedia",
        label: "Multimedia",
        icon: "play",
        checked: false,
        url: "",
      },
    ],
    attachment: null,
  };

export const EDIT_BIBLIOGRAPHIC_FORM_INITIAL_STATE: BibliographicFormInitialState =
  {
    ...FILLED_FORM_VALUES,
    authors: [
      {
        id: "author-edit-1",
        name: "Mel Robbins",
        authorType: "personal-name",
        classification: "primary-author",
      },
    ],
    subjects: [
      {
        id: "subject-edit-1",
        subject: "",
        subjectType: "",
        classification: "",
      },
    ],
    labels: [
      {
        id: "new-title",
        label: "New Title",
        icon: "heart",
        checked: false,
        url: "",
      },
      {
        id: "favorite-title",
        label: "Favorite Title",
        icon: "heart",
        checked: true,
        url: "https://example.com/favorite-title",
      },
      {
        id: "multimedia",
        label: "Multimedia",
        icon: "play",
        checked: false,
        url: "",
      },
    ],
    attachment: {
      name: "let_them_theory.png",
      size: 500 * 1024,
    },
  };
