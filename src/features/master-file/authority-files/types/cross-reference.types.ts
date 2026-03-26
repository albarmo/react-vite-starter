import { z } from "zod";
import { crossReferenceFormSchema } from "@/features/master-file/authority-files/schema/cross-reference.schema";

export type CrossReferenceFormData = z.infer<typeof crossReferenceFormSchema>;
export type CrossReferenceFormInitialState = CrossReferenceFormData;

export type CrossReferenceFormProps = {
  mode: "create" | "edit";
  pageTitle: string;
  initialState: CrossReferenceFormInitialState;
  recordId?: string;
};

export type CrossReferenceRecord = {
  id: string;
  code: string;
  description: string;
};

export type CrossReferenceDetail = CrossReferenceRecord;

export type CrossReferenceDeleteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
};
