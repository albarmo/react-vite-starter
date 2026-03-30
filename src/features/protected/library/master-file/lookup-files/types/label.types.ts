import { labelFormSchema } from "@/features/protected/library/master-file/lookup-files/schemas/label.schema";
import type { ReactNode } from "react";
import { z } from "zod";

export type LabelAttachment = {
  name: string;
  size: number;
  format: string;
};

export type LabelRecord = {
  id: string;
  name: string;
  description: string;
  attachment: LabelAttachment | null;
  updatedAt: string;
};

export type LabelDetail = LabelRecord;

export type LabelFormData = z.infer<typeof labelFormSchema>;
export type LabelFormInitialState = LabelFormData;

export type LabelFormProps = {
  mode: "create" | "edit";
  pageTitle: string;
  initialState: LabelFormInitialState;
  recordId?: string;
};

export type LabelUploadState = "idle" | "uploading" | "uploaded" | "paused";

export type LabelDeleteTarget =
  | {
      type: "single";
      record: LabelRecord;
    }
  | {
      type: "selected";
      ids: string[];
    };

export type LabelToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onCreate: () => void;
};

export type LabelFooterProps = {
  pageSize: number;
  totalItems: number;
  displayedCount: number;
  onPageSizeChange: (value: number) => void;
};

export type LabelSelectionBarProps = {
  sidebarOpen: boolean;
  onDeleteSelected: () => void;
};

export type LabelDeleteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  description?: ReactNode;
};
