import { z } from "zod";
import { locationFormSchema } from "@/features/master-file/authority-files/schema/location.schema";

export type LocationFormData = z.infer<typeof locationFormSchema>;
export type LocationFormInitialState = LocationFormData;

export type LocationFormProps = {
  mode: "create" | "edit";
  pageTitle: string;
  initialState: LocationFormInitialState;
  recordId?: string;
};

export type LocationStatus = "active" | "orphaned";

export type LocationRecord = {
  id: string;
  code: string;
  name: string;
  status: LocationStatus;
  updatedAt: string;
};

export type LocationDetail = {
  id: string;
  code: string;
  name: string;
  updatedAt: string;
};

export type LocationToolbarProps = {
  search: string;
  activeFilter: LocationStatus;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onFilterChange: (value: LocationStatus) => void;
  onCreate: () => void;
};

export type LocationFooterProps = {
  pageSize: number;
  totalItems: number;
  displayedCount: number;
  onPageSizeChange: (value: number) => void;
};

export type LocationDeleteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
};
