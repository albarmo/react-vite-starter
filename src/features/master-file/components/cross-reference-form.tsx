"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "@/shared/components/ui/textarea";
import { cn } from "@/shared/lib/cn";
import { useEffect, useMemo, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  crossReferenceFormSchema,
  type CrossReferenceFormData,
  type CrossReferenceFormInitialState,
} from "./cross-reference-form-presets";

type CrossReferenceFormProps = {
  mode: "create" | "edit";
  pageTitle: string;
  initialState: CrossReferenceFormInitialState;
  recordId?: string;
};

const FORM_INPUT_CLASS =
  "h-11 rounded-md border-grey-40 bg-white text-base text-grey-100 shadow-none placeholder:text-grey-70";
const FORM_TEXTAREA_CLASS =
  "min-h-24 rounded-md border-grey-40 bg-white text-base text-grey-100 shadow-none placeholder:text-grey-70";

function cloneInitialState(
  initialState: CrossReferenceFormInitialState,
): CrossReferenceFormInitialState {
  return { ...initialState };
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
  children,
}: {
  label: ReactNode;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-grey-100">{label}</Label>
      {children}
      <FieldErrorText message={error} />
    </div>
  );
}

function CrossReferenceFormBreadcrumb({
  mode,
}: {
  mode: "create" | "edit";
}) {
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
            <Link to="/master-file/authority-files/subject">
              Authority Files
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-grey-70" />
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="hover:text-blue-50">
            <Link to="/master-file/authority-files/subject">Subject</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-grey-70" />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-medium text-blue-50">
            {mode === "create"
              ? "Create Cross Reference"
              : "Edit Cross Reference"}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function CrossReferenceFormActionBar({
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
        <Button type="submit" form="cross-reference-form">
          Save
        </Button>
      </div>
    </div>
  );
}

export function CrossReferenceForm({
  mode,
  pageTitle,
  initialState,
  recordId,
}: CrossReferenceFormProps) {
  const navigate = useNavigate();
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);

  const defaultValues = useMemo(
    () => cloneInitialState(initialState),
    [initialState],
  );

  const form = useForm<CrossReferenceFormData>({
    resolver: zodResolver(crossReferenceFormSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const handleCancel = () => {
    if (mode === "edit" && recordId) {
      navigate(
        `/master-file/authority-files/subject/cross-reference/detail/${recordId}`,
      );
      return;
    }

    navigate("/master-file/authority-files/subject");
  };

  const handleSubmit = form.handleSubmit(() => {
    if (mode === "edit" && recordId) {
      navigate(
        `/master-file/authority-files/subject/cross-reference/detail/${recordId}`,
      );
      return;
    }

    navigate("/master-file/authority-files/subject");
  });

  return (
    <PageContainer className="pt-6 pb-32 md:pt-8 md:pb-36">
      <div>
        <h1 className="text-4xl font-medium text-primary">{pageTitle}</h1>
        <CrossReferenceFormBreadcrumb mode={mode} />
      </div>

      <MdUpwardCard className="mt-6 rounded-[18px] p-5">
        <Form {...form}>
          <form
            id="cross-reference-form"
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-medium text-grey-100">{pageTitle}</h2>

            <FormSectionField
              label="Code"
              error={form.formState.errors.code?.message}
            >
              <Input
                width="full"
                placeholder="Enter Code"
                {...form.register("code")}
                className={FORM_INPUT_CLASS}
              />
            </FormSectionField>

            <FormSectionField
              label="Description"
              error={form.formState.errors.description?.message}
            >
              <Textarea
                placeholder="Enter Description"
                {...form.register("description")}
                className={FORM_TEXTAREA_CLASS}
              />
            </FormSectionField>
          </form>
        </Form>
      </MdUpwardCard>

      <CrossReferenceFormActionBar
        sidebarOpen={sidebarOpen}
        onCancel={handleCancel}
      />
    </PageContainer>
  );
}
