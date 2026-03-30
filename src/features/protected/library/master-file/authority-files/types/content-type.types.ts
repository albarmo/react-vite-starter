import { contentTypeFormSchema } from "@/features/protected/library/master-file/authority-files/schema/content-type.schema";
import type { ReactNode } from "react";
import { z } from "zod";

export type ContentTypeFormData = z.infer<typeof contentTypeFormSchema>;
export type ContentTypeFormInitialState = ContentTypeFormData;

export type ContentTypeFormProps = {
  mode: "create" | "edit";
  pageTitle: string;
  initialState: ContentTypeFormInitialState;
  recordId?: string;
};

export type ContentTypeRecord = {
  id: string;
  code: string;
  name: string;
  updatedAt: string;
};

export type ContentTypeDetail = ContentTypeRecord;

export type ContentTypeDeleteTarget =
  | {
      type: "single";
      record: ContentTypeRecord;
    }
  | {
      type: "selected";
      ids: string[];
    };

export type ContentTypeToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onCreate: () => void;
};

export type ContentTypeFooterProps = {
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

export type ContentTypeSelectionBarProps = {
  sidebarOpen: boolean;
  onDeleteSelected: () => void;
};

export type ContentTypeDeleteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  description?: ReactNode;
};
