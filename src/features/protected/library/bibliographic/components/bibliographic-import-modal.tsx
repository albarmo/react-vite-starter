"use client";

import type {
  BibliographicImportFormValues,
  BibliographicImportModalProps,
  UploadState,
} from "@/features/protected/library/bibliographic/types/bibliographic-modal.types";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { cn } from "@/shared/lib/cn";
import { Folder, Pause, Trash2, Upload, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

const MAX_FILE_SIZE_KB = 2048;

const DEFAULT_IMPORT_VALUES: BibliographicImportFormValues = {
  file: null,
  fieldSeparator: ";",
  fieldEnclosedWith: '"',
  numberOfRecordsToExport: "0",
  startFromRecord: "1",
  putColumnNamesInFirstRow: false,
};

function formatFileSize(size: number) {
  const kilobytes = Math.max(1, Math.round(size / 1024));
  return `${kilobytes} KB`;
}

export function BibliographicImportModal({
  open,
  onOpenChange,
  onImport,
}: BibliographicImportModalProps) {
  const [formValues, setFormValues] = useState(DEFAULT_IMPORT_VALUES);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const putColumnsId = useId();

  const updateFormValue = <T extends keyof BibliographicImportFormValues>(
    key: T,
    value: BibliographicImportFormValues[T],
  ) => {
    setFormValues((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const resetState = () => {
    setFormValues(DEFAULT_IMPORT_VALUES);
    setUploadState("idle");
    setUploadProgress(0);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);

    if (!nextOpen) {
      resetState();
    }
  };

  useEffect(() => {
    if (uploadState !== "uploading") {
      return;
    }

    const timer = window.setInterval(() => {
      setUploadProgress((current) => {
        const next = Math.min(current + 13, 100);

        if (next >= 100) {
          setUploadState("uploaded");
          return 100;
        }

        return next;
      });
    }, 180);

    return () => {
      window.clearInterval(timer);
    };
  }, [uploadState]);

  const selectedFile = formValues.file;
  const estimatedSecondsRemaining =
    uploadState === "uploading"
      ? Math.max(1, Math.ceil((100 - uploadProgress) / 1.2))
      : 0;

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0];

    if (!nextFile) {
      return;
    }

    updateFormValue("file", nextFile);
    setUploadProgress(0);
    setUploadState("uploading");
  };

  const handleRemoveFile = () => {
    updateFormValue("file", null);
    setUploadProgress(0);
    setUploadState("idle");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImport = () => {
    onImport?.(formValues);
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-125 rounded-md border-none p-0 shadow-[0_32px_64px_rgba(15,23,42,0.18)]"
      >
        <div className="relative px-6 pt-5 pb-6">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div className="flex size-10 items-center justify-center rounded-full bg-blue-10">
              <div className="flex size-8 items-center justify-center rounded-full bg-white text-blue-50 shadow-[0_4px_16px_rgba(29,109,222,0.18)]">
                <Upload className="size-3" />
              </div>
            </div>

            <DialogClose
              className={cn(
                "inline-flex size-8 items-center justify-center rounded-full text-grey-70 transition-colors hover:bg-grey-20 hover:text-grey-100",
              )}
            >
              <X className="size-5" />
              <span className="sr-only">Close import modal</span>
            </DialogClose>
          </div>

          <div>
            <DialogTitle className="text-lg font-medium text-grey-100">
              Import Bibliography List
            </DialogTitle>
            <DialogDescription className="text-base leading-6 text-grey-70">
              Configure the import file and parsing format before continuing.
            </DialogDescription>
          </div>

          <div className="mt-5 space-y-3.5">
            <div className="space-y-2">
              <Label
                htmlFor="import-file-input"
                className="text-base text-grey-100"
              >
                File
              </Label>

              <input
                ref={fileInputRef}
                id="import-file-input"
                type="file"
                accept="application/pdf,.pdf"
                className="sr-only"
                onChange={handleFileChange}
              />

              {selectedFile && uploadState !== "idle" ? (
                <div className="border-grey-35 rounded-xl border bg-white px-4 py-3">
                  <div className="flex items-start gap-3">
                    {uploadState === "uploaded" ? (
                      <div className="mt-0.5 flex size-11 items-center justify-center rounded-xl bg-blue-10 text-blue-50">
                        <Folder className="size-5" />
                      </div>
                    ) : (
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[17px] font-semibold text-grey-100">
                          {selectedFile.name}
                        </p>
                        <p className="text-grey-60 mt-1 text-base">
                          {uploadProgress}% • {estimatedSecondsRemaining} detik
                          tersisa
                        </p>
                        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-blue-10">
                          <div
                            className="h-full rounded-full bg-blue-50 transition-[width] duration-200"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {uploadState === "uploaded" ? (
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[17px] font-semibold text-grey-100">
                          {selectedFile.name}
                        </p>
                        <p className="text-grey-60 mt-1 text-base">
                          {formatFileSize(selectedFile.size)}
                        </p>
                      </div>
                    ) : null}

                    <div className="ml-auto flex items-center gap-2">
                      {uploadState === "uploading" && (
                        <button
                          type="button"
                          className="inline-flex size-8 items-center justify-center rounded-full text-grey-90 transition-colors hover:bg-grey-20"
                          onClick={() => setUploadState("paused")}
                          aria-label="Pause upload"
                        >
                          <Pause className="size-4" />
                        </button>
                      )}
                      {uploadState === "paused" && (
                        <button
                          type="button"
                          className="inline-flex rounded-full bg-grey-20 px-3 py-1 text-base font-medium text-grey-90 transition-colors hover:bg-grey-30"
                          onClick={() => setUploadState("uploading")}
                        >
                          Resume
                        </button>
                      )}
                      <button
                        type="button"
                        className="inline-flex size-8 items-center justify-center rounded-full text-red-50 transition-colors hover:bg-red-10"
                        onClick={handleRemoveFile}
                        aria-label="Remove file"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleChooseFile}
                  className="flex min-h-18.5 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-blue-30 bg-white px-4 py-5 text-center transition-colors hover:border-blue-50 hover:bg-blue-10/30"
                >
                  <Upload className="size-5 text-blue-50" />
                  <span className="text-base text-grey-100">
                    Sisipkan dokumen atau{" "}
                    <span className="font-medium text-blue-50">Unggah</span>
                  </span>
                </button>
              )}

              {(uploadState === "idle" ||
                uploadState === "uploading" ||
                uploadState === "paused") && (
                <div className="text-grey-60 flex items-center justify-between gap-3 text-base">
                  <span>Format: PDF</span>
                  <span>Maks. {MAX_FILE_SIZE_KB} KB</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="import-field-separator"
                className="text-base text-grey-100"
              >
                Field Separator
              </Label>
              <Input
                id="import-field-separator"
                width="full"
                value={formValues.fieldSeparator}
                onChange={(event) =>
                  updateFormValue("fieldSeparator", event.target.value)
                }
                className="h-12 rounded-xl border-grey-40 bg-white px-4 text-base text-grey-100"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="import-field-enclosed-with"
                className="text-base text-grey-100"
              >
                Field Enclosed With
              </Label>
              <Input
                id="import-field-enclosed-with"
                width="full"
                value={formValues.fieldEnclosedWith}
                onChange={(event) =>
                  updateFormValue("fieldEnclosedWith", event.target.value)
                }
                className="h-12 rounded-xl border-grey-40 bg-white px-4 text-base text-grey-100"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="import-number-of-records"
                className="text-base text-grey-100"
              >
                Number of Records To Export
                <span className="text-grey-60 font-normal">(opsional)</span>
              </Label>
              <Input
                id="import-number-of-records"
                width="full"
                inputMode="numeric"
                value={formValues.numberOfRecordsToExport}
                onChange={(event) =>
                  updateFormValue("numberOfRecordsToExport", event.target.value)
                }
                className="h-12 rounded-xl border-grey-40 bg-white px-4 text-base text-grey-100"
              />
              <p className="text-grey-60 text-base">0 for all records.</p>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="import-start-from-record"
                className="text-base text-grey-100"
              >
                Start From Record
                <span className="text-grey-60 font-normal">(opsional)</span>
              </Label>
              <Input
                id="import-start-from-record"
                width="full"
                inputMode="numeric"
                value={formValues.startFromRecord}
                onChange={(event) =>
                  updateFormValue("startFromRecord", event.target.value)
                }
                className="h-12 rounded-xl border-grey-40 bg-white px-4 text-base text-grey-100"
              />
            </div>

            <Label
              htmlFor={putColumnsId}
              className="gap-3 pt-1 text-base font-normal text-grey-100"
            >
              <Checkbox
                id={putColumnsId}
                checked={formValues.putColumnNamesInFirstRow}
                onCheckedChange={(checked) =>
                  updateFormValue("putColumnNamesInFirstRow", checked === true)
                }
                className="size-4"
              />
              Put columns names in the first row
            </Label>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Button
              type="button"
              variant="outline"
              className="h-12 rounded-xl border-grey-40 bg-white text-base font-semibold text-grey-90"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="h-12 rounded-xl text-base font-semibold"
              onClick={handleImport}
            >
              Import
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
