import type { ReactNode } from "react";
import { z } from "zod";
import { carrierTypeFormSchema } from "@/features/master-file/authority-files/schema/carrier-type.schema";

export type CarrierTypeFormData = z.infer<typeof carrierTypeFormSchema>;
export type CarrierTypeFormInitialState = CarrierTypeFormData;

export type CarrierTypeFormProps = {
  mode: "create" | "edit";
  pageTitle: string;
  initialState: CarrierTypeFormInitialState;
  recordId?: string;
};

export type CarrierTypeRecord = {
  id: string;
  code: string;
  name: string;
  updatedAt: string;
};

export type CarrierTypeDetail = CarrierTypeRecord;

export type CarrierTypeDeleteTarget =
  | {
      type: "single";
      record: CarrierTypeRecord;
    }
  | {
      type: "selected";
      ids: string[];
    };

export type CarrierTypeToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onCreate: () => void;
};

export type CarrierTypeFooterProps = {
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

export type CarrierTypeSelectionBarProps = {
  sidebarOpen: boolean;
  onDeleteSelected: () => void;
};

export type CarrierTypeDeleteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  description?: ReactNode;
};
