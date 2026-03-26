import type { ReactNode } from "react";
import { z } from "zod";
import { mediaTypeFormSchema } from "@/features/master-file/authority-files/schema/media-type.schema";

export type MediaTypeFormData = z.infer<typeof mediaTypeFormSchema>;
export type MediaTypeFormInitialState = MediaTypeFormData;

export type MediaTypeFormProps = {
  mode: "create" | "edit";
  pageTitle: string;
  initialState: MediaTypeFormInitialState;
  recordId?: string;
};

export type MediaTypeRecord = {
  id: string;
  code: string;
  name: string;
  updatedAt: string;
};

export type MediaTypeDetail = MediaTypeRecord;

export type MediaTypeDeleteTarget =
  | {
      type: "single";
      record: MediaTypeRecord;
    }
  | {
      type: "selected";
      ids: string[];
    };

export type MediaTypeToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onCreate: () => void;
};

export type MediaTypeFooterProps = {
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

export type MediaTypeSelectionBarProps = {
  sidebarOpen: boolean;
  onDeleteSelected: () => void;
};

export type MediaTypeDeleteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  description?: ReactNode;
};
