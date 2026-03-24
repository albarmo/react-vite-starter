"use client";

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
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { cn } from "@/shared/lib/cn";
import { Upload, X } from "lucide-react";
import { useId, useState } from "react";

type RecordSeparator = "new-line" | "carriage-return";

export type BibliographicExportFormValues = {
  fieldSeparator: string;
  fieldEnclosedWith: string;
  recordSeparator: RecordSeparator;
  numberOfRecordsToExport: string;
  startFromRecord: string;
  putColumnNamesInFirstRow: boolean;
};

type BibliographicExportModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExport?: (values: BibliographicExportFormValues) => void;
};

const DEFAULT_EXPORT_VALUES: BibliographicExportFormValues = {
  fieldSeparator: ";",
  fieldEnclosedWith: '"',
  recordSeparator: "new-line",
  numberOfRecordsToExport: "0",
  startFromRecord: "1",
  putColumnNamesInFirstRow: false,
};

export function BibliographicExportModal({
  open,
  onOpenChange,
  onExport,
}: BibliographicExportModalProps) {
  const [formValues, setFormValues] = useState(DEFAULT_EXPORT_VALUES);
  const recordSeparatorGroupId = useId();
  const putColumnsId = useId();

  const updateFormValue = <T extends keyof BibliographicExportFormValues>(
    key: T,
    value: BibliographicExportFormValues[T],
  ) => {
    setFormValues((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleExport = () => {
    onExport?.(formValues);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-125 rounded-md border-none p-0 shadow-[0_32px_64px_rgba(15,23,42,0.18)]"
      >
        <div className="relative px-6 pt-5 pb-6">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div className="flex size-14 items-center justify-center rounded-full bg-blue-10">
              <div className="flex size-10 items-center justify-center rounded-full bg-white text-blue-50 shadow-[0_4px_16px_rgba(29,109,222,0.18)]">
                <Upload className="size-5" />
              </div>
            </div>

            <DialogClose
              className={cn(
                "inline-flex size-8 items-center justify-center rounded-full text-grey-70 transition-colors hover:bg-grey-20 hover:text-grey-100",
              )}
            >
              <X className="size-5" />
              <span className="sr-only">Close export modal</span>
            </DialogClose>
          </div>

          <div>
            <DialogTitle className="text-lg font-medium text-grey-100">
              Export Bibliography List
            </DialogTitle>
            <DialogDescription className="text-base leading-6 text-grey-70">
              Configure the export format for the selected bibliography data.
            </DialogDescription>
          </div>

          <div className="mt-7 space-y-3.5">
            <div className="space-y-2">
              <Label
                htmlFor="field-separator"
                className="text-base text-grey-100"
              >
                Field Separator
              </Label>
              <Input
                id="field-separator"
                width="full"
                value={formValues.fieldSeparator}
                onChange={(event) =>
                  updateFormValue("fieldSeparator", event.target.value)
                }
                className="h-11 rounded-md border-grey-40 bg-white px-4 text-base text-grey-100"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="field-enclosed-with"
                className="text-base text-grey-100"
              >
                Field Enclosed With
              </Label>
              <Input
                id="field-enclosed-with"
                width="full"
                value={formValues.fieldEnclosedWith}
                onChange={(event) =>
                  updateFormValue("fieldEnclosedWith", event.target.value)
                }
                className="h-11 rounded-md border-grey-40 bg-white px-4 text-base text-grey-100"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor={recordSeparatorGroupId}
                className="text-base text-grey-100"
              >
                Record Separator
              </Label>
              <RadioGroup
                id={recordSeparatorGroupId}
                value={formValues.recordSeparator}
                onValueChange={(value) =>
                  updateFormValue("recordSeparator", value as RecordSeparator)
                }
                className="gap-3"
              >
                <Label
                  htmlFor="record-separator-new-line"
                  className="gap-3 text-base font-normal text-grey-100"
                >
                  <RadioGroupItem
                    id="record-separator-new-line"
                    value="new-line"
                    className="size-5"
                  />
                  New Line
                </Label>
                <Label
                  htmlFor="record-separator-carriage-return"
                  className="gap-3 text-base font-normal text-grey-100"
                >
                  <RadioGroupItem
                    id="record-separator-carriage-return"
                    value="carriage-return"
                    className="size-5"
                  />
                  Carriage Return
                </Label>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="number-of-records"
                className="text-base text-grey-100"
              >
                Number of Records To Export
                <span className="text-grey-60 font-normal">(opsional)</span>
              </Label>
              <Input
                id="number-of-records"
                width="full"
                inputMode="numeric"
                value={formValues.numberOfRecordsToExport}
                onChange={(event) =>
                  updateFormValue("numberOfRecordsToExport", event.target.value)
                }
                className="h-11 rounded-md border-grey-40 bg-white px-4 text-base text-grey-100"
              />
              <p className="text-grey-60 text-base">0 for all records.</p>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="start-from-record"
                className="text-base text-grey-100"
              >
                Start From Record
                <span className="text-grey-60 font-normal">(opsional)</span>
              </Label>
              <Input
                id="start-from-record"
                width="full"
                inputMode="numeric"
                value={formValues.startFromRecord}
                onChange={(event) =>
                  updateFormValue("startFromRecord", event.target.value)
                }
                className="h-11 rounded-md border-grey-40 bg-white px-4 text-base text-grey-100"
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
                className="border-grey-60 size-5 rounded"
              />
              Put columns names in the first row
            </Label>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Button
              type="button"
              variant="outline"
              className="h-11 rounded-md border-grey-40 bg-white text-base font-semibold text-grey-90"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="h-11 rounded-md text-base font-semibold"
              onClick={handleExport}
            >
              Export
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
