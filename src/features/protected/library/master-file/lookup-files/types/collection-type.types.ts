import { collectionTypeFormSchema } from "@/features/protected/library/master-file/lookup-files/schemas/collection-type.schema";
import type { ReactNode } from "react";
import { z } from "zod";

export type CollectionTypeRecord = {
  id: string;
  type: string;
  updatedAt: string;
};

export type CollectionTypeDetail = CollectionTypeRecord;

export type CollectionTypeFormData = z.infer<typeof collectionTypeFormSchema>;
export type CollectionTypeFormInitialState = CollectionTypeFormData;

export type CollectionTypeFormProps = {
  mode: "create" | "edit";
  pageTitle: string;
  initialState: CollectionTypeFormInitialState;
  recordId?: string;
};

export type CollectionTypeDeleteTarget =
  | {
      type: "single";
      record: CollectionTypeRecord;
    }
  | {
      type: "selected";
      ids: string[];
    };

export type CollectionTypeToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onCreate: () => void;
};

export type CollectionTypeFooterProps = {
  pageSize: number;
  totalItems: number;
  displayedCount: number;
  onPageSizeChange: (value: number) => void;
};

export type CollectionTypeSelectionBarProps = {
  sidebarOpen: boolean;
  onDeleteSelected: () => void;
};

export type CollectionTypeDeleteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  description?: ReactNode;
};
