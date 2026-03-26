import type { ReactNode } from "react";
import { z } from "zod";
import { itemStatusFormSchema } from "@/features/master-file/lookup-files/schemas/item-status.schema";

export type ItemStatusRuleKey =
  | "no-loan-transaction"
  | "skipped-by-stock-take";

export type ItemStatusRecord = {
  id: string;
  code: string;
  name: string;
  rules: ItemStatusRuleKey[];
  updatedAt: string;
};

export type ItemStatusDetail = ItemStatusRecord;

export type ItemStatusFormData = z.infer<typeof itemStatusFormSchema>;
export type ItemStatusFormInitialState = ItemStatusFormData;

export type ItemStatusFormProps = {
  mode: "create" | "edit";
  pageTitle: string;
  initialState: ItemStatusFormInitialState;
  recordId?: string;
};

export type ItemStatusDeleteTarget =
  | {
      type: "single";
      record: ItemStatusRecord;
    }
  | {
      type: "selected";
      ids: string[];
    };

export type ItemStatusToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onCreate: () => void;
};

export type ItemStatusFooterProps = {
  pageSize: number;
  totalItems: number;
  displayedCount: number;
  onPageSizeChange: (value: number) => void;
};

export type ItemStatusSelectionBarProps = {
  sidebarOpen: boolean;
  onDeleteSelected: () => void;
};

export type ItemStatusDeleteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  description?: ReactNode;
};
