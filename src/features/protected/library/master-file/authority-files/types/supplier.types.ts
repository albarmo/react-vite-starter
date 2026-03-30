import { supplierFormSchema } from "@/features/protected/library/master-file/authority-files/schema/supplier.schema";
import type { ReactNode } from "react";
import { z } from "zod";

export type SupplierFormData = z.infer<typeof supplierFormSchema>;
export type SupplierFormInitialState = SupplierFormData;

export type SupplierFormProps = {
  mode: "create" | "edit";
  pageTitle: string;
  initialState: SupplierFormInitialState;
  recordId?: string;
};

export type SupplierRecord = {
  id: string;
  name: string;
  address: string;
  contact: string;
  phoneNumber: string;
  faxNumber: string;
  accountNumber: string;
  updatedAt: string;
};

export type SupplierDetail = SupplierRecord;

export type SupplierDeleteTarget =
  | {
      type: "single";
      record: SupplierRecord;
    }
  | {
      type: "selected";
      ids: string[];
    };

export type SupplierFooterProps = {
  pageSize: number;
  onPageSizeChange: (value: number) => void;
};

export type SupplierSelectionBarProps = {
  sidebarOpen: boolean;
  onDeleteSelected: () => void;
};

export type SupplierDeleteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  description?: ReactNode;
};
