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
import { useEffect, useMemo, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  CREATE_ITEM_CODE_PATTERN_FORM_INITIAL_STATE,
  itemCodePatternFormSchema,
  type ItemCodePatternFormData,
  type ItemCodePatternFormInitialState,
} from "./item-code-pattern-presets";

type ItemCodePatternFormProps = {
  mode: "create" | "edit";
  pageTitle: string;
  initialState?: ItemCodePatternFormInitialState;
  recordId?: string;
};

const FORM_INPUT_CLASS =
  "h-11 rounded-md border-grey-40 bg-white text-base text-grey-100 shadow-none placeholder:text-grey-70";

function cloneInitialState(
  initialState: ItemCodePatternFormInitialState,
): ItemCodePatternFormInitialState {
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

function ItemCodePatternFormBreadcrumb({
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
            <Link to="/master-file/tools">Tools</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-grey-70" />
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="hover:text-blue-50">
            <Link to="/master-file/tools/item-code-pattern">
              Item Code Pattern
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-grey-70" />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-medium text-blue-50">
            {mode === "create"
              ? "Create Item Code Pattern"
              : "Edit Item Code Pattern"}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function ItemCodePatternFormActionBar({
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
        <Button type="submit" form="item-code-pattern-form">
          Save
        </Button>
      </div>
    </div>
  );
}

export function ItemCodePatternForm({
  mode,
  pageTitle,
  initialState = CREATE_ITEM_CODE_PATTERN_FORM_INITIAL_STATE,
  recordId,
}: ItemCodePatternFormProps) {
  const navigate = useNavigate();
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);

  const defaultValues = useMemo(
    () => cloneInitialState(initialState),
    [initialState],
  );

  const form = useForm<ItemCodePatternFormData>({
    resolver: zodResolver(itemCodePatternFormSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const handleCancel = () => {
    if (mode === "edit" && recordId) {
      navigate(`/master-file/tools/item-code-pattern/detail/${recordId}`);
      return;
    }

    navigate("/master-file/tools/item-code-pattern");
  };

  const handleSubmit = form.handleSubmit(() => {
    if (mode === "edit" && recordId) {
      navigate(`/master-file/tools/item-code-pattern/detail/${recordId}`);
      return;
    }

    navigate("/master-file/tools/item-code-pattern");
  });

  return (
    <PageContainer className="pt-6 pb-32 md:pt-8 md:pb-36">
      <div>
        <h1 className="text-4xl font-medium text-primary">{pageTitle}</h1>
        <ItemCodePatternFormBreadcrumb mode={mode} />
      </div>

      <MdUpwardCard className="mt-6 rounded-[18px] p-5">
        <Form {...form}>
          <form
            id="item-code-pattern-form"
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-medium text-grey-100">{pageTitle}</h2>

            <FormSectionField
              label="Prefix"
              error={form.formState.errors.prefix?.message}
            >
              <Input
                width="full"
                placeholder="Enter Prefix"
                {...form.register("prefix")}
                className={FORM_INPUT_CLASS}
              />
            </FormSectionField>

            <FormSectionField
              label="Suffix"
              error={form.formState.errors.suffix?.message}
            >
              <Input
                width="full"
                placeholder="Enter Suffix"
                {...form.register("suffix")}
                className={FORM_INPUT_CLASS}
              />
            </FormSectionField>

            <FormSectionField
              label="Length Serial Number"
              error={form.formState.errors.serialLength?.message}
            >
              <Input
                width="full"
                inputMode="numeric"
                placeholder="Enter Length Serial Number"
                {...form.register("serialLength")}
                className={FORM_INPUT_CLASS}
              />
            </FormSectionField>
          </form>
        </Form>
      </MdUpwardCard>

      <ItemCodePatternFormActionBar
        sidebarOpen={sidebarOpen}
        onCancel={handleCancel}
      />
    </PageContainer>
  );
}
