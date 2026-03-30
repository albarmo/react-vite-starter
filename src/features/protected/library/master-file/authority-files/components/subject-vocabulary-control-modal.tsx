"use client";

import { subjectVocabularyControlModalSchema } from "@/features/protected/library/master-file/authority-files/schema/subject.schema";
import type {
  SubjectVocabularyControlModalData,
  SubjectVocabularyControlModalProps,
} from "@/features/protected/library/master-file/authority-files/types/subject.types";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Form } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { cn } from "@/shared/lib/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { RELATED_TERM_OPTIONS } from "./subject-form-presets";

const INPUT_CLASS =
  "h-11 rounded-md border-grey-40 bg-white text-base text-grey-100 shadow-none placeholder:text-grey-70";

function FieldErrorText({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="text-sm text-destructive">{message}</p>;
}

export function SubjectVocabularyControlModal({
  open,
  mode,
  initialState,
  onOpenChange,
  onSubmit,
}: SubjectVocabularyControlModalProps) {
  const form = useForm<SubjectVocabularyControlModalData>({
    resolver: zodResolver(subjectVocabularyControlModalSchema),
    defaultValues: initialState,
    mode: "onChange",
  });

  useEffect(() => {
    form.reset(initialState);
  }, [form, initialState]);

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleSubmit = form.handleSubmit((values) => {
    onSubmit(values);
    onOpenChange(false);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-125 rounded-[18px] border-none p-0 shadow-[0_32px_64px_rgba(15,23,42,0.18)]"
      >
        <div className="px-6 pt-5 pb-6">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-blue-10">
              <div className="flex size-8 items-center justify-center rounded-full bg-blue-20/45 text-blue-50 shadow-[0_4px_16px_rgba(37,99,235,0.18)]">
                <Plus className="size-4" />
              </div>
            </div>

            <DialogClose
              className={cn(
                "inline-flex size-8 items-center justify-center rounded-full text-grey-70 transition-colors hover:bg-grey-20 hover:text-grey-100",
              )}
            >
              <X className="size-5" />
              <span className="sr-only">Close vocabulary control modal</span>
            </DialogClose>
          </div>

          <div>
            <DialogTitle className="text-lg font-medium text-grey-100">
              {mode === "create"
                ? "Add Vocabulary Control"
                : "Edit Vocabulary Control"}
            </DialogTitle>
            <DialogDescription className="text-base leading-7">
              Fill in this form to add vocabulary control.
            </DialogDescription>
          </div>

          <Form {...form}>
            <form
              id="subject-vocabulary-control-form"
              className="mt-8 space-y-5"
              onSubmit={handleSubmit}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <Label className="text-sm font-medium text-grey-100">
                    Related Term
                  </Label>
                  <Button
                    type="button"
                    variant="ghost"
                    className="hover:text-blue-60 h-auto px-0 text-blue-50 hover:bg-transparent"
                  >
                    <Plus className="size-4" />
                    Add Cross Reference
                  </Button>
                </div>

                <Controller
                  control={form.control}
                  name="relatedTerm"
                  render={({ field }) => (
                    <Select
                      value={field.value || undefined}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="h-11 w-full rounded-md border-grey-40 bg-white text-base text-grey-100 shadow-none data-[placeholder]:text-grey-70">
                        <SelectValue placeholder="Select Related Term" />
                      </SelectTrigger>
                      <SelectContent
                        align="start"
                        className="rounded-md border-grey-30"
                      >
                        {RELATED_TERM_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldErrorText
                  message={form.formState.errors.relatedTerm?.message}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-grey-100">
                  Vocabulary
                </Label>
                <Input
                  width="full"
                  placeholder="Enter Vocabulary"
                  {...form.register("vocabulary")}
                  className={INPUT_CLASS}
                />
                <p className="text-sm text-grey-70">
                  Type to search for existing topics or to add a new one.
                </p>
                <FieldErrorText
                  message={form.formState.errors.vocabulary?.message}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-grey-100">
                  Classification
                </Label>
                <Input
                  width="full"
                  placeholder="Enter Classification"
                  {...form.register("classification")}
                  className={INPUT_CLASS}
                />
                <FieldErrorText
                  message={form.formState.errors.classification?.message}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  disabled={!form.formState.isValid}
                >
                  {mode === "create" ? "Add" : "Save"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
