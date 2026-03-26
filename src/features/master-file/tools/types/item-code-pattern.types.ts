import type { ReactNode } from "react";
import { z } from "zod";
import { itemCodePatternFormSchema } from "@/features/master-file/tools/schemas/item-code-pattern.schema";

export type ItemCodePatternRecord = {
  id: string;
  name: string;
  prefix: string;
  suffix: string;
  serialLength: string;
  updatedAt: string;
};

export type ItemCodePatternDetail = ItemCodePatternRecord;

export type ItemCodePatternFormData = z.infer<typeof itemCodePatternFormSchema>;
export type ItemCodePatternFormInitialState = ItemCodePatternFormData;

export type ItemCodePatternFormProps = {
  mode: "create" | "edit";
  pageTitle: string;
  initialState?: ItemCodePatternFormInitialState;
  recordId?: string;
};

export type ItemCodePatternDeleteTarget =
  | {
      type: "single";
      record: ItemCodePatternRecord;
    }
  | {
      type: "selected";
      ids: string[];
    };

export type ItemCodePatternToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onCreate: () => void;
};

export type ItemCodePatternFooterProps = {
  pageSize: number;
  totalItems: number;
  displayedCount: number;
  onPageSizeChange: (value: number) => void;
};

export type ItemCodePatternSelectionBarProps = {
  sidebarOpen: boolean;
  onDeleteSelected: () => void;
};

export type ItemCodePatternDeleteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  description?: ReactNode;
};
