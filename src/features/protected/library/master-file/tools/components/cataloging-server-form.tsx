"use client";

import { useUiStore } from "@/app/store/ui.store";
import { catalogingServerFormSchema } from "@/features/protected/library/master-file/tools/schemas/cataloging-server.schema";
import type {
  CatalogingServerFormData,
  CatalogingServerFormInitialState,
  CatalogingServerFormProps,
} from "@/features/protected/library/master-file/tools/types/cataloging-server.types";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, type ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  CATALOGING_SERVER_TYPE_OPTIONS,
  CREATE_CATALOGING_SERVER_FORM_INITIAL_STATE,
} from "./cataloging-server-form-presets";

const FORM_INPUT_CLASS =
  "h-11 rounded-md border-grey-40 bg-white text-base text-grey-100 shadow-none placeholder:text-grey-70";

function cloneInitialState(
  initialState: CatalogingServerFormInitialState,
): CatalogingServerFormInitialState {
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
  label: string;
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

function CatalogingServerFormBreadcrumb({ mode }: { mode: "create" | "edit" }) {
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
            <Link to="/master-file/tools">Tools</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-grey-70" />
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="hover:text-blue-50">
            <Link to="/master-file/tools/cataloging-servers">
              Cataloging Servers
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-grey-70" />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-medium text-blue-50">
            {mode === "create"
              ? "Create Catalog Server"
              : "Edit Catalog Server"}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function CatalogingServerFormActionBar({
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
        <Button type="submit" form="cataloging-server-form">
          Save
        </Button>
      </div>
    </div>
  );
}

export function CatalogingServerForm({
  mode,
  pageTitle,
  initialState = CREATE_CATALOGING_SERVER_FORM_INITIAL_STATE,
  recordId,
}: CatalogingServerFormProps) {
  const navigate = useNavigate();
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);

  const defaultValues = useMemo(
    () => cloneInitialState(initialState),
    [initialState],
  );

  const form = useForm<CatalogingServerFormData>({
    resolver: zodResolver(catalogingServerFormSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const handleCancel = () => {
    if (mode === "edit" && recordId) {
      navigate(`/master-file/tools/cataloging-servers/detail/${recordId}`);
      return;
    }

    navigate("/master-file/tools/cataloging-servers");
  };

  const handleSubmit = form.handleSubmit(() => {
    if (mode === "edit" && recordId) {
      navigate(`/master-file/tools/cataloging-servers/detail/${recordId}`);
      return;
    }

    navigate("/master-file/tools/cataloging-servers");
  });

  return (
    <PageContainer className="pt-6 pb-32 md:pt-8 md:pb-36">
      <div>
        <h1 className="text-4xl font-medium text-primary">{pageTitle}</h1>
        <CatalogingServerFormBreadcrumb mode={mode} />
      </div>

      <MdUpwardCard className="mt-6 rounded-[18px] p-5">
        <Form {...form}>
          <form
            id="cataloging-server-form"
            className="space-y-6"
            onSubmit={handleSubmit}
          >
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
              label="URL"
              error={form.formState.errors.url?.message}
            >
              <Input
                width="full"
                placeholder="Enter URL"
                {...form.register("url")}
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
                    {CATALOGING_SERVER_TYPE_OPTIONS.map((option) => {
                      const itemId = `cataloging-server-type-${option.value}`;

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
          </form>
        </Form>
      </MdUpwardCard>

      <CatalogingServerFormActionBar
        sidebarOpen={sidebarOpen}
        onCancel={handleCancel}
      />
    </PageContainer>
  );
}
