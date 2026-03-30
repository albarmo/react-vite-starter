import type { ReactNode } from "react";

export type RecordSeparator = "new-line" | "carriage-return";

export type BibliographicExportFormValues = {
  fieldSeparator: string;
  fieldEnclosedWith: string;
  recordSeparator: RecordSeparator;
  numberOfRecordsToExport: string;
  startFromRecord: string;
  putColumnNamesInFirstRow: boolean;
};

export type BibliographicExportModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExport?: (values: BibliographicExportFormValues) => void;
};

export type BibliographicImportFormValues = {
  file: File | null;
  fieldSeparator: string;
  fieldEnclosedWith: string;
  numberOfRecordsToExport: string;
  startFromRecord: string;
  putColumnNamesInFirstRow: boolean;
};

export type BibliographicImportModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport?: (values: BibliographicImportFormValues) => void;
};

export type UploadState = "idle" | "uploading" | "uploaded" | "paused";

export type BibliographicDeleteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  description: ReactNode;
  title?: string;
};
