import {
  bibliographicAttachmentPreviewSchema,
  bibliographicAuthorEntrySchema,
  bibliographicFormSchema,
  bibliographicFormValuesSchema,
  bibliographicLabelEntrySchema,
  bibliographicSubjectEntrySchema,
} from "@/features/protected/library/bibliographic/schemas/bibliographic-form.schema";
import { z } from "zod";

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

export type BibliographicSelectOption = {
  value: string;
  label: string;
};

export type BibliographicFormProps = {
  pageTitle: string;
  initialState: BibliographicFormInitialState;
};

export type ScalarFieldName = keyof BibliographicFormValues;
