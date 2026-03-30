import { catalogingServerFormSchema } from "@/features/protected/library/master-file/tools/schemas/cataloging-server.schema";
import type { ReactNode } from "react";
import { z } from "zod";

export type CatalogingServerTypeValue =
  | "p2p-server"
  | "z3950-server"
  | "z3950-sru-server"
  | "marc-sru-server";

export type CatalogingServerRecord = {
  id: string;
  name: string;
  url: string;
  type: CatalogingServerTypeValue;
  updatedAt: string;
};

export type CatalogingServerDetail = CatalogingServerRecord;

export type CatalogingServerFormData = z.infer<
  typeof catalogingServerFormSchema
>;
export type CatalogingServerFormInitialState = CatalogingServerFormData;

export type CatalogingServerFormProps = {
  mode: "create" | "edit";
  pageTitle: string;
  initialState?: CatalogingServerFormInitialState;
  recordId?: string;
};

export type CatalogingServerDeleteTarget =
  | {
      type: "single";
      record: CatalogingServerRecord;
    }
  | {
      type: "selected";
      ids: string[];
    };

export type CatalogingServerToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onCreate: () => void;
};

export type CatalogingServerFooterProps = {
  pageSize: number;
  totalItems: number;
  displayedCount: number;
  onPageSizeChange: (value: number) => void;
};

export type CatalogingServerSelectionBarProps = {
  sidebarOpen: boolean;
  onDeleteSelected: () => void;
};

export type CatalogingServerDeleteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  description?: ReactNode;
};
