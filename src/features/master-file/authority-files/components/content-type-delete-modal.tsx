"use client";

import type { ContentTypeDeleteModalProps } from "@/features/master-file/authority-files/types/content-type.types";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/cn";
import { Trash2, X } from "lucide-react";

export function ContentTypeDeleteModal({
  open,
  onOpenChange,
  onDelete,
  description = "Are you sure you want to delete this Content Type?",
}: ContentTypeDeleteModalProps) {
  const handleClose = () => {
    onOpenChange(false);
  };

  const handleDelete = () => {
    onDelete();
    onOpenChange(false);
  };

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
                <Trash2 className="size-4" />
              </div>
            </div>

            <DialogClose
              className={cn(
                "inline-flex size-8 items-center justify-center rounded-full text-grey-70 transition-colors hover:bg-grey-20 hover:text-grey-100",
              )}
            >
              <X className="size-5" />
              <span className="sr-only">Close delete confirmation</span>
            </DialogClose>
          </div>

          <div>
            <DialogTitle className="text-lg font-medium text-grey-100">
              Delete Content Type
            </DialogTitle>
            <DialogDescription className="text-base leading-7">
              {description}
            </DialogDescription>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="lg"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
