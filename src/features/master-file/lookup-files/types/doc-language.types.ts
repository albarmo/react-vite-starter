import type { ReactNode } from "react";
import { z } from "zod";
import { docLanguageFormSchema } from "@/features/master-file/lookup-files/schemas/doc-language.schema";

export type DocLanguageRecord = {
  id: string;
  language: string;
  updatedAt: string;
};

export type DocLanguageDetail = DocLanguageRecord;

export type DocLanguageFormData = z.infer<typeof docLanguageFormSchema>;
export type DocLanguageFormInitialState = DocLanguageFormData;

export type DocLanguageFormProps = {
  mode: "create" | "edit";
  pageTitle: string;
  initialState: DocLanguageFormInitialState;
  recordId?: string;
};

export type DocLanguageDeleteTarget =
  | {
      type: "single";
      record: DocLanguageRecord;
    }
  | {
      type: "selected";
      ids: string[];
    };

export type DocLanguageToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onCreate: () => void;
};

export type DocLanguageFooterProps = {
  pageSize: number;
  totalItems: number;
  displayedCount: number;
  onPageSizeChange: (value: number) => void;
};

export type DocLanguageSelectionBarProps = {
  sidebarOpen: boolean;
  onDeleteSelected: () => void;
};

export type DocLanguageDeleteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  description?: ReactNode;
};
