import type { ReactNode } from "react";
import { z } from "zod";
import { frequencyFormSchema } from "@/features/master-file/lookup-files/schemas/frequency.schema";

export type FrequencyLanguageValue = "english" | "indonesia";
export type FrequencyTimeUnitValue = "day" | "week" | "month" | "year";

export type FrequencyRecord = {
  id: string;
  frequency: string;
  language: FrequencyLanguageValue;
  timeIncrement: string;
  timeUnit: FrequencyTimeUnitValue;
  updatedAt: string;
};

export type FrequencyDetail = FrequencyRecord;

export type FrequencyFormData = z.infer<typeof frequencyFormSchema>;
export type FrequencyFormInitialState = FrequencyFormData;

export type FrequencyFormProps = {
  mode: "create" | "edit";
  pageTitle: string;
  initialState?: FrequencyFormInitialState;
  recordId?: string;
};

export type FrequencyDeleteTarget =
  | {
      type: "single";
      record: FrequencyRecord;
    }
  | {
      type: "selected";
      ids: string[];
    };

export type FrequencyToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onCreate: () => void;
};

export type FrequencyFooterProps = {
  pageSize: number;
  totalItems: number;
  displayedCount: number;
  onPageSizeChange: (value: number) => void;
};

export type FrequencySelectionBarProps = {
  sidebarOpen: boolean;
  onDeleteSelected: () => void;
};

export type FrequencyDeleteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  description?: ReactNode;
};
