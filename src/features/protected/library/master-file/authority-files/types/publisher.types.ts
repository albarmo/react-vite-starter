import { publisherFormSchema } from "@/features/protected/library/master-file/authority-files/schema/publisher.schema";
import type { ReactNode } from "react";
import { z } from "zod";

export type PublisherFormData = z.infer<typeof publisherFormSchema>;
export type PublisherFormInitialState = PublisherFormData;

export type PublisherFormProps = {
  mode: "create" | "edit";
  pageTitle: string;
  initialState: PublisherFormInitialState;
  recordId?: string;
};

export type PublisherStatus = "active" | "orphaned";

export type PublisherRecord = {
  id: string;
  name: string;
  status: PublisherStatus;
  updatedAt: string;
};

export type PublisherDetail = PublisherRecord;

export type PublisherDeleteTarget =
  | {
      type: "single";
      record: PublisherRecord;
    }
  | {
      type: "selected";
      ids: string[];
    };

export type PublisherToolbarProps = {
  search: string;
  activeFilter: PublisherStatus;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onFilterChange: (value: PublisherStatus) => void;
  onCreate: () => void;
};

export type PublisherFooterProps = {
  pageSize: number;
  totalItems: number;
  displayedCount: number;
  onPageSizeChange: (value: number) => void;
};

export type PublisherSelectionBarProps = {
  sidebarOpen: boolean;
  onDeleteSelected: () => void;
};

export type PublisherDeleteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  description?: ReactNode;
};
