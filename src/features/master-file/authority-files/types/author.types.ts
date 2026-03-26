import type { ReactNode } from "react";
import { z } from "zod";
import { authorFormSchema } from "@/features/master-file/authority-files/schema/author.schema";

export type AuthorTypeOption =
  | "personal-name"
  | "organizational-body"
  | "conference";

export type AuthorFormData = z.infer<typeof authorFormSchema>;
export type AuthorFormInitialState = AuthorFormData;

export type AuthorFormProps = {
  mode: "create" | "edit";
  pageTitle: string;
  initialState: AuthorFormInitialState;
};

export type AuthorStatus = "active" | "orphaned";

export type AuthorRecord = {
  id: string;
  name: string;
  birthYear: string;
  type: string;
  files: string;
  status: AuthorStatus;
  updatedAt: string;
};

export type AuthorDetail = AuthorRecord;

export type AuthorDeleteTarget =
  | {
      type: "single";
      record: AuthorRecord;
    }
  | {
      type: "selected";
      ids: string[];
    };

export type AuthorToolbarProps = {
  search: string;
  activeFilter: AuthorStatus;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onFilterChange: (value: AuthorStatus) => void;
  onCreate: () => void;
};

export type AuthorFooterProps = {
  pageSize: number;
  totalItems: number;
  displayedCount: number;
  onPageSizeChange: (value: number) => void;
};

export type AuthorSelectionBarProps = {
  sidebarOpen: boolean;
  onDeleteSelected: () => void;
};

export type AuthorDeleteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  description?: ReactNode;
};
