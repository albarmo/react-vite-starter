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
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { cn } from "@/shared/lib/cn";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useMemo, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AUTHOR_TYPE_OPTIONS,
  authorFormSchema,
  type AuthorFormData,
  type AuthorFormInitialState,
} from "./author-form-presets";

type AuthorFormProps = {
  mode: "create" | "edit";
  pageTitle: string;
  initialState: AuthorFormInitialState;
};

const FORM_INPUT_CLASS =
  "h-11 rounded-md border-grey-40 bg-white text-base text-grey-100 shadow-none placeholder:text-grey-70";

function cloneInitialState(
  initialState: AuthorFormInitialState,
): AuthorFormInitialState {
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

function OptionalFieldLabel({ label }: { label: string }) {
  return (
    <span>
      {label} <span className="font-normal text-grey-70">(optional)</span>
    </span>
  );
}

function AuthorFormBreadcrumb({ mode }: { mode: "create" | "edit" }) {
  return (
    <Breadcrumb className="mt-2">
      <BreadcrumbList className="text-sm text-grey-80">
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="hover:text-blue-50">
            <Link to="/master-file/authority-files/author">Author</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-grey-70" />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-medium text-blue-50">
            {mode === "create" ? "Create Author" : "Edit Author"}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function AuthorFormActionBar({
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
        <Button type="submit" form="author-form">
          Save
        </Button>
      </div>
    </div>
  );
}

export function AuthorForm({
  mode,
  pageTitle,
  initialState,
}: AuthorFormProps) {
  const navigate = useNavigate();
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);

  const defaultValues = useMemo(
    () => cloneInitialState(initialState),
    [initialState],
  );

  const form = useForm<AuthorFormData>({
    resolver: zodResolver(authorFormSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const handleCancel = () => {
    navigate("/master-file/authority-files/author");
  };

  const handleSubmit = form.handleSubmit(() => {
    navigate("/master-file/authority-files/author");
  });

  return (
    <PageContainer className="pt-6 pb-32 md:pt-8 md:pb-36">
      <div>
        <h1 className="text-4xl font-medium text-primary">{pageTitle}</h1>
        <AuthorFormBreadcrumb mode={mode} />
      </div>

      <MdUpwardCard className="mt-6 rounded-[18px] p-5">
        <Form {...form}>
          <form id="author-form" className="space-y-6" onSubmit={handleSubmit}>
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
              label={<OptionalFieldLabel label="Birth Year" />}
              error={form.formState.errors.birthYear?.message}
            >
              <Input
                width="full"
                placeholder="Enter Birth Year"
                {...form.register("birthYear")}
                className={FORM_INPUT_CLASS}
              />
            </FormSectionField>

            <FormSectionField
              label="Type"
              error={form.formState.errors.type?.message}
            >
              <Controller
                control={form.control}
                name="type"
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="gap-3"
                  >
                    {AUTHOR_TYPE_OPTIONS.map((option) => {
                      const itemId = `author-type-${option.value}`;

                      return (
                        <label
                          key={option.value}
                          htmlFor={itemId}
                          className="flex items-center gap-3 text-base font-normal text-grey-100"
                        >
                          <RadioGroupItem id={itemId} value={option.value} />
                          {option.label}
                        </label>
                      );
                    })}
                  </RadioGroup>
                )}
              />
            </FormSectionField>

            <FormSectionField
              label={<OptionalFieldLabel label="Files" />}
              error={form.formState.errors.files?.message}
            >
              <Input
                width="full"
                placeholder="Enter Files"
                {...form.register("files")}
                className={FORM_INPUT_CLASS}
              />
            </FormSectionField>
          </form>
        </Form>
      </MdUpwardCard>

      <AuthorFormActionBar sidebarOpen={sidebarOpen} onCancel={handleCancel} />
    </PageContainer>
  );
}
