import type { ReactNode } from "react";
import { z } from "zod";
import { placeFormSchema } from "@/features/master-file/lookup-files/schemas/place.schema";

export type PlaceStatus = "active" | "orphaned";

export type PlaceRecord = {
  id: string;
  name: string;
  status: PlaceStatus;
  updatedAt: string;
};

export type PlaceDetail = PlaceRecord;

export type PlaceFormData = z.infer<typeof placeFormSchema>;
export type PlaceFormInitialState = PlaceFormData;

export type PlaceFormProps = {
  mode: "create" | "edit";
  pageTitle: string;
  initialState: PlaceFormInitialState;
  recordId?: string;
};

export type PlaceDeleteTarget =
  | {
      type: "single";
      record: PlaceRecord;
    }
  | {
      type: "selected";
      ids: string[];
    };

export type PlaceToolbarProps = {
  search: string;
  activeFilter: PlaceStatus;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onFilterChange: (value: PlaceStatus) => void;
  onCreate: () => void;
};

export type PlaceFooterProps = {
  pageSize: number;
  totalItems: number;
  displayedCount: number;
  onPageSizeChange: (value: number) => void;
};

export type PlaceSelectionBarProps = {
  sidebarOpen: boolean;
  onDeleteSelected: () => void;
};

export type PlaceDeleteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  description?: ReactNode;
};
