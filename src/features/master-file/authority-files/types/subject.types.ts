import { z } from "zod";
import {
  subjectFormSchema,
  subjectVocabularyControlModalSchema,
  subjectVocabularyControlSchema,
} from "@/features/master-file/authority-files/schema/subject.schema";

export type SubjectTypeOption =
  | "topic"
  | "geographic"
  | "name"
  | "temporal"
  | "occupation";

export type RelatedTermOption =
  | "use"
  | "use-for"
  | "broader-term"
  | "narrower-term"
  | "related-term"
  | "see-also";

export type SubjectVocabularyControlModalData = z.infer<
  typeof subjectVocabularyControlModalSchema
>;
export type SubjectVocabularyControl = z.infer<
  typeof subjectVocabularyControlSchema
>;
export type SubjectFormData = z.infer<typeof subjectFormSchema>;
export type SubjectFormInitialState = SubjectFormData;

export type SubjectFormProps = {
  mode: "create" | "edit";
  pageTitle: string;
  initialState: SubjectFormInitialState;
  recordId?: string;
};

export type SubjectVocabularyControlModalProps = {
  open: boolean;
  mode: "create" | "edit";
  initialState: SubjectVocabularyControlModalData;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: SubjectVocabularyControlModalData) => void;
};

export type SubjectVocabularyDeleteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
};

export type SubjectDeleteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
};

export type VocabularyControlTableRow = SubjectVocabularyControl & {
  formIndex: number;
};

export type SubjectStatus = "active" | "orphaned";
export type SubjectTabValue = "subject" | "cross-reference";

export type SubjectRecord = {
  id: string;
  subject: string;
  classificationCode: string;
  type: string;
  authorityFiles: string;
  status: SubjectStatus;
};

export type SubjectDetail = SubjectRecord & {
  updatedAt: string;
};

export type SubjectPageDeleteTarget =
  | {
      tab: "subject";
      id: string;
    }
  | {
      tab: "cross-reference";
      id: string;
    };

export type SubjectToolbarProps = {
  search: string;
  activeFilter: SubjectStatus;
  onCreate: () => void;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onFilterChange: (value: SubjectStatus) => void;
};

export type CrossReferenceToolbarProps = {
  search: string;
  onCreate: () => void;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
};

export type SubjectFooterProps = {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  from: number;
  to: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  onPageSizeChange: (value: number) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
};

export type CrossReferenceFooterProps = {
  pageSize: number;
  totalItems: number;
  displayedCount: number;
  onPageSizeChange: (value: number) => void;
};
