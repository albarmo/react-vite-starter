"use client";

import { bookRequestRejectSchema } from "@/features/protected/library/bibliographic/schemas/book-request.schema";
import type {
  BookRequestRejectFormValues,
  BookRequestRejectModalProps,
} from "@/features/protected/library/bibliographic/types/book-request.types";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { cn } from "@/shared/lib/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX, X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const INPUT_CLASS =
  "h-11 rounded-md border-grey-40 bg-white text-base text-grey-100 shadow-none placeholder:text-grey-70";

const DEFAULT_VALUES: BookRequestRejectFormValues = {
  reason: "",
};

export function BookRequestRejectModal({
  open,
  onOpenChange,
  defaultReason,
  onReject,
}: BookRequestRejectModalProps) {
  const form = useForm<BookRequestRejectFormValues>({
    resolver: zodResolver(bookRequestRejectSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onChange",
  });

  useEffect(() => {
    if (!open) {
      form.reset(DEFAULT_VALUES);
      return;
    }

    form.reset({
      reason: defaultReason ?? "",
    });
  }, [defaultReason, form, open]);

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleSubmit = form.handleSubmit((values) => {
    onReject(values);
    onOpenChange(false);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-100 rounded-md border-none p-0 shadow-[0_32px_64px_rgba(15,23,42,0.18)]"
      >
        <div className="px-6 pt-5 pb-6">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-red-10">
              <div className="flex size-8 items-center justify-center rounded-full bg-red-30/50 text-red-60 shadow-[0_4px_16px_rgba(248,113,113,0.22)]">
                <CircleX className="size-4" />
              </div>
            </div>

            <DialogClose
              className={cn(
                "inline-flex size-8 items-center justify-center rounded-full text-grey-70 transition-colors hover:bg-grey-20 hover:text-grey-100",
              )}
            >
              <X className="size-5" />
              <span className="sr-only">Close reject confirmation</span>
            </DialogClose>
          </div>

          <div>
            <DialogTitle className="text-lg font-medium text-grey-100">
              Reject Book Request
            </DialogTitle>
            <DialogDescription className="text-base leading-7">
              Are you sure you want to delete this Item?
            </DialogDescription>
          </div>

          <Form {...form}>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-grey-100">
                      Reason
                    </FormLabel>
                    <FormControl>
                      <Input
                        width="full"
                        placeholder="Input Reason"
                        className={INPUT_CLASS}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                  variant="destructive"
                  size="lg"
                  disabled={!form.formState.isValid}
                >
                  Reject
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
