"use client";

import { useUiStore } from "@/app/store/ui.store";
import { PageContainer } from "@/shared/components/common/app-page-container";
import { MdUpwardCard } from "@/shared/components/common/md-upward-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";
import { Button } from "@/shared/components/ui/button";
import { Form } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { cn } from "@/shared/lib/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { Folder, Pause, Trash2, Upload } from "lucide-react";
import {
  type ChangeEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { labelFormSchema } from "@/features/master-file/lookup-files/schemas/label.schema";
import type {
  LabelAttachment,
  LabelFormData,
  LabelFormInitialState,
  LabelFormProps,
  LabelUploadState as UploadState,
} from "@/features/master-file/lookup-files/types/label.types";

const FORM_INPUT_CLASS =
  "h-11 rounded-md border-grey-40 bg-white text-base text-grey-100 shadow-none placeholder:text-grey-70";

function cloneInitialState(
  initialState: LabelFormInitialState,
): LabelFormInitialState {
  return {
    ...initialState,
    attachment: initialState.attachment ? { ...initialState.attachment } : null,
  };
}

function formatFileSize(size: number) {
  if (size >= 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }

  return `${Math.round(size / 1024)} KB`;
}

function FieldErrorText({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="text-sm text-destructive">{message}</p>;
}

function FormSectionField({
  label,
  error,
  helper,
  children,
}: {
  label: ReactNode;
  error?: string;
  helper?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-grey-100">{label}</Label>
      {children}
      {helper}
      <FieldErrorText message={error} />
    </div>
  );
}

function LabelFormBreadcrumb({ mode }: { mode: "create" | "edit" }) {
  return (
    <Breadcrumb className="mt-2">
      <BreadcrumbList className="text-sm text-grey-80">
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="hover:text-blue-50">
            <Link to="/master-file">Master File</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-grey-70" />
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="hover:text-blue-50">
            <Link to="/master-file/look-up-files">Look Up Files</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-grey-70" />
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="hover:text-blue-50">
            <Link to="/master-file/look-up-files/label">Label</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-grey-70" />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-medium text-blue-50">
            {mode === "create" ? "Create Label" : "Edit Label"}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function LabelFormActionBar({
  sidebarOpen,
  onCancel,
}: {
  sidebarOpen: boolean;
  onCancel: () => void;
}) {
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-grey-30 bg-white/95 shadow-[0_-18px_48px_rgba(15,23,42,0.08)] backdrop-blur",
        sidebarOpen ? "md:left-68" : "md:left-20",
      )}
    >
      <div className="mx-auto flex w-full max-w-310 items-center justify-end gap-3 px-3 py-4 sm:px-4 md:px-8">
        <Button
          type="button"
          variant="ghost"
          className="text-blue-30 hover:bg-blue-10 hover:text-blue-50"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit" form="label-form">
          Save
        </Button>
      </div>
    </div>
  );
}

function buildAttachmentFromFile(file: File): LabelAttachment {
  return {
    name: file.name,
    size: file.size,
    format: "JPG",
  };
}

export function LabelForm({
  mode,
  pageTitle,
  initialState,
  recordId,
}: LabelFormProps) {
  const navigate = useNavigate();
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const defaultValues = useMemo(
    () => cloneInitialState(initialState),
    [initialState],
  );

  const form = useForm<LabelFormData>({
    resolver: zodResolver(labelFormSchema),
    defaultValues,
  });

  const attachment = useWatch({
    control: form.control,
    name: "attachment",
  });

  const [uploadState, setUploadState] = useState<UploadState>(
    defaultValues.attachment ? "uploaded" : "idle",
  );
  const [uploadProgress, setUploadProgress] = useState(
    defaultValues.attachment ? 100 : 0,
  );

  useEffect(() => {
    if (uploadState !== "uploading") {
      return;
    }

    const timer = window.setInterval(() => {
      setUploadProgress((current) => {
        const nextValue = Math.min(current + 13, 100);

        if (nextValue >= 100) {
          setUploadState("uploaded");
        }

        return nextValue;
      });
    }, 280);

    return () => window.clearInterval(timer);
  }, [uploadState]);

  const estimatedSecondsRemaining =
    uploadState === "uploading"
      ? Math.max(1, Math.ceil((100 - uploadProgress) / 3.4))
      : 0;

  const handleCancel = () => {
    if (mode === "edit" && recordId) {
      navigate(`/master-file/look-up-files/label/detail/${recordId}`);
      return;
    }

    navigate("/master-file/look-up-files/label");
  };

  const handleSubmit = form.handleSubmit(() => {
    navigate(
      mode === "edit" && recordId
        ? `/master-file/look-up-files/label/detail/${recordId}`
        : "/master-file/look-up-files/label",
    );
  });

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveAttachment = () => {
    form.setValue("attachment", null, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setUploadState("idle");
    setUploadProgress(0);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    form.setValue("attachment", buildAttachmentFromFile(file), {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setUploadProgress(0);
    setUploadState("uploading");
  };

  return (
    <PageContainer className="pt-6 pb-32 md:pt-8 md:pb-36">
      <div>
        <h1 className="text-4xl font-medium text-primary">{pageTitle}</h1>
        <LabelFormBreadcrumb mode={mode} />
      </div>

      <MdUpwardCard className="mt-6 rounded-[18px] p-5">
        <Form {...form}>
          <form id="label-form" className="space-y-6" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-medium text-grey-100">{pageTitle}</h2>

            <FormSectionField
              label="Name"
              error={form.formState.errors.name?.message}
            >
              <Input
                width="full"
                placeholder="Enter Name"
                {...form.register("name")}
                className={FORM_INPUT_CLASS}
              />
            </FormSectionField>

            <FormSectionField
              label="File Attachment"
              error={form.formState.errors.attachment?.message}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,.jpg,.jpeg"
                className="sr-only"
                onChange={handleFileChange}
              />

              {attachment ? (
                <div className="rounded-md border border-grey-40 bg-white px-4 py-3">
                  <div className="flex items-center gap-3">
                    {uploadState === "uploaded" ? (
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-blue-10 text-blue-50">
                        <Folder className="size-5" />
                      </div>
                    ) : null}

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-base font-medium text-grey-100">
                        {uploadState === "uploading"
                          ? "Uploading the file..."
                          : attachment.name}
                      </p>
                      <p className="text-sm text-grey-70">
                        {uploadState === "uploading"
                          ? `${uploadProgress}% • ${estimatedSecondsRemaining} detik tersisa`
                          : formatFileSize(attachment.size)}
                      </p>

                      {uploadState === "uploading" ? (
                        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-blue-10">
                          <div
                            className="h-full rounded-full bg-blue-50 transition-[width] duration-200"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      ) : null}
                    </div>

                    <div className="ml-auto flex items-center gap-2">
                      {uploadState === "uploading" ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          className="text-grey-90 hover:bg-grey-20 hover:text-grey-100"
                          aria-label="Pause upload"
                          onClick={() => setUploadState("paused")}
                        >
                          <Pause className="size-4" />
                        </Button>
                      ) : null}

                      {uploadState === "paused" ? (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-8 px-3 text-sm"
                          onClick={() => setUploadState("uploading")}
                        >
                          Resume
                        </Button>
                      ) : null}

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="text-red-50 hover:bg-red-10 hover:text-red-60"
                        aria-label="Remove attachment"
                        onClick={handleRemoveAttachment}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleChooseFile}
                  className="flex min-h-18.5 w-full items-center justify-center gap-2 rounded-md border border-dashed border-blue-30 bg-white px-4 py-5 text-center transition-colors hover:border-blue-50 hover:bg-blue-10/30"
                >
                  <Upload className="size-4 text-blue-50" />
                  <span className="text-base text-grey-100">
                    Drag and drop or{" "}
                    <span className="font-medium text-blue-50">Upload</span>
                  </span>
                </button>
              )}

              {!attachment || uploadState === "uploading" || uploadState === "paused" ? (
                <div className="flex items-center justify-between gap-3 text-sm text-grey-70">
                  <span>Format: JPG</span>
                  <span>All image will be automatically resized to max. 500 KB.</span>
                </div>
              ) : null}
            </FormSectionField>

            <FormSectionField
              label={
                <>
                  Description <span className="text-grey-70">(optional)</span>
                </>
              }
              error={form.formState.errors.description?.message}
            >
              <Input
                width="full"
                placeholder="Enter Description"
                {...form.register("description")}
                className={FORM_INPUT_CLASS}
              />
            </FormSectionField>
          </form>
        </Form>
      </MdUpwardCard>

      <LabelFormActionBar sidebarOpen={sidebarOpen} onCancel={handleCancel} />
    </PageContainer>
  );
}
