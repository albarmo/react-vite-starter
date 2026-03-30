import { generalMaterialDesignationFormSchema } from "@/features/protected/library/master-file/authority-files/schema/general-material-designation.schema";
import type { ReactNode } from "react";
import { z } from "zod";

export type GeneralMaterialDesignationFormData = z.infer<
  typeof generalMaterialDesignationFormSchema
>;
export type GeneralMaterialDesignationFormInitialState =
  GeneralMaterialDesignationFormData;

export type GeneralMaterialDesignationFormProps = {
  mode: "create" | "edit";
  pageTitle: string;
  initialState: GeneralMaterialDesignationFormInitialState;
  recordId?: string;
};

export type GeneralMaterialDesignationRecord = {
  id: string;
  code: string;
  name: string;
  updatedAt: string;
};

export type GeneralMaterialDesignationDetail = GeneralMaterialDesignationRecord;

export type GeneralMaterialDesignationDeleteTarget =
  | {
      type: "single";
      record: GeneralMaterialDesignationRecord;
    }
  | {
      type: "selected";
      ids: string[];
    };

export type GeneralMaterialDesignationToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onCreate: () => void;
};

export type GeneralMaterialDesignationFooterProps = {
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

export type GeneralMaterialDesignationSelectionBarProps = {
  sidebarOpen: boolean;
  onDeleteSelected: () => void;
};

export type GeneralMaterialDesignationDeleteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  description?: ReactNode;
};
