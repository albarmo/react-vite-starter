"use client";

import { useUiStore } from "@/app/store/ui.store";
import { SubjectVocabularyControlModal } from "@/features/protected/library/master-file/authority-files/components/subject-vocabulary-control-modal";
import { SubjectVocabularyDeleteModal } from "@/features/protected/library/master-file/authority-files/components/subject-vocabulary-delete-modal";
import { subjectFormSchema } from "@/features/protected/library/master-file/authority-files/schema/subject.schema";
import type {
  SubjectFormData,
  SubjectFormInitialState,
  SubjectFormProps,
  SubjectVocabularyControl,
  SubjectVocabularyControlModalData,
  VocabularyControlTableRow,
} from "@/features/protected/library/master-file/authority-files/types/subject.types";
import { PageContainer } from "@/shared/components/common/app-page-container";
import { DataTable } from "@/shared/components/common/data-table";
import { MdUpwardCard } from "@/shared/components/common/md-upward-card";
import { SearchInput } from "@/shared/components/common/search-input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { cn } from "@/shared/lib/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ColumnDef } from "@tanstack/react-table";
import { Pencil, Plus, Trash2 } from "lucide-react";
import {
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  PAGE_SIZE_OPTIONS,
  RELATED_TERM_OPTIONS,
  SUBJECT_TYPE_OPTIONS,
} from "./subject-form-presets";

const FORM_INPUT_CLASS =
  "h-11 rounded-md border-grey-40 bg-white text-base text-grey-100 shadow-none placeholder:text-grey-70";

const EMPTY_VOCABULARY_CONTROL_MODAL_STATE: SubjectVocabularyControlModalData =
  {
    relatedTerm: "",
    vocabulary: "",
    classification: "",
  };

function cloneInitialState(
  initialState: SubjectFormInitialState,
): SubjectFormInitialState {
  return {
    ...initialState,
    vocabularyControls: initialState.vocabularyControls.map((item) => ({
      ...item,
    })),
  };
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

function SubjectFormBreadcrumb({ mode }: { mode: "create" | "edit" }) {
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
            {mode === "create" ? "Create Subject" : "Edit Subject"}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function SubjectFormActionBar({
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
        <Button type="submit" form="subject-form">
          Save
        </Button>
      </div>
    </div>
  );
}

function getRelatedTermLabel(value: SubjectVocabularyControl["relatedTerm"]) {
  return (
    RELATED_TERM_OPTIONS.find((option) => option.value === value)?.label ?? "-"
  );
}

export function SubjectForm({
  mode,
  pageTitle,
  initialState,
  recordId,
}: SubjectFormProps) {
  const navigate = useNavigate();
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);
  const [vocabularySearch, setVocabularySearch] = useState("");
  const [vocabularyPageSize, setVocabularyPageSize] = useState(10);
  const [isVocabularyModalOpen, setIsVocabularyModalOpen] = useState(false);
  const [editingVocabularyControlIndex, setEditingVocabularyControlIndex] =
    useState<number | null>(null);
  const [deletingVocabularyControlIndex, setDeletingVocabularyControlIndex] =
    useState<number | null>(null);

  const defaultValues = useMemo(
    () => cloneInitialState(initialState),
    [initialState],
  );

  const form = useForm<SubjectFormData>({
    resolver: zodResolver(subjectFormSchema),
    defaultValues,
  });

  const { append, remove, update } = useFieldArray({
    control: form.control,
    name: "vocabularyControls",
  });

  const vocabularyControls = useWatch({
    control: form.control,
    name: "vocabularyControls",
  });

  const vocabularyControlIdSequence = useRef(0);

  useEffect(() => {
    form.reset(defaultValues);
    vocabularyControlIdSequence.current =
      defaultValues.vocabularyControls.length;
  }, [defaultValues, form]);

  const deferredVocabularySearch = useDeferredValue(vocabularySearch);
  const normalizedVocabularySearch = deferredVocabularySearch
    .trim()
    .toLowerCase();

  const vocabularyControlRows = useMemo<VocabularyControlTableRow[]>(
    () =>
      (vocabularyControls ?? []).map((item, index) => ({
        ...item,
        formIndex: index,
      })),
    [vocabularyControls],
  );

  const filteredVocabularyControls = useMemo(() => {
    if (!normalizedVocabularySearch) {
      return vocabularyControlRows;
    }

    return vocabularyControlRows.filter((item) =>
      [
        getRelatedTermLabel(item.relatedTerm),
        item.vocabulary,
        item.classification,
      ].some((value) =>
        value.toLowerCase().includes(normalizedVocabularySearch),
      ),
    );
  }, [normalizedVocabularySearch, vocabularyControlRows]);

  const vocabularyControlPageRows = useMemo(
    () => filteredVocabularyControls.slice(0, vocabularyPageSize),
    [filteredVocabularyControls, vocabularyPageSize],
  );

  const vocabularyControlModalInitialState = useMemo(() => {
    if (editingVocabularyControlIndex === null) {
      return EMPTY_VOCABULARY_CONTROL_MODAL_STATE;
    }

    const activeVocabularyControl =
      vocabularyControls?.[editingVocabularyControlIndex];

    if (!activeVocabularyControl) {
      return EMPTY_VOCABULARY_CONTROL_MODAL_STATE;
    }

    return {
      relatedTerm: activeVocabularyControl.relatedTerm,
      vocabulary: activeVocabularyControl.vocabulary,
      classification: activeVocabularyControl.classification,
    };
  }, [editingVocabularyControlIndex, vocabularyControls]);

  const vocabularyControlColumns = useMemo<
    ColumnDef<VocabularyControlTableRow>[]
  >(
    () => [
      {
        id: "number",
        meta: {
          headClassName: "w-16",
          cellClassName: "px-3 py-4",
        },
        header: "No.",
        cell: ({ row }) => (
          <span className="text-base text-grey-90">{row.index + 1}.</span>
        ),
      },
      {
        accessorKey: "relatedTerm",
        meta: {
          headClassName: "min-w-[180px]",
          cellClassName: "px-3 py-4",
        },
        header: "Related Term",
        cell: ({ row }) => (
          <span className="text-base text-grey-90">
            {getRelatedTermLabel(row.original.relatedTerm)}
          </span>
        ),
      },
      {
        accessorKey: "vocabulary",
        meta: {
          headClassName: "min-w-[180px]",
          cellClassName: "px-3 py-4",
        },
        header: "Vocabulary",
        cell: ({ row }) => (
          <span className="text-base text-grey-90">
            {row.original.vocabulary}
          </span>
        ),
      },
      {
        accessorKey: "classification",
        meta: {
          headClassName: "min-w-[180px]",
          cellClassName: "px-3 py-4",
        },
        header: "Classification",
        cell: ({ row }) => (
          <span className="text-base text-grey-90">
            {row.original.classification || "-"}
          </span>
        ),
      },
      {
        id: "actions",
        meta: {
          headClassName: "w-[110px] text-right",
          cellClassName: "px-3 py-4 text-right",
        },
        header: () => <div className="text-right">Action</div>,
        cell: ({ row }) => (
          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Edit ${row.original.vocabulary}`}
              className="text-blue-60 hover:bg-blue-10 hover:text-blue-50"
              onClick={(event) => {
                event.stopPropagation();
                setEditingVocabularyControlIndex(row.original.formIndex);
                setIsVocabularyModalOpen(true);
              }}
            >
              <Pencil className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Delete ${row.original.vocabulary}`}
              className="text-red-50 hover:bg-red-10 hover:text-red-60"
              onClick={(event) => {
                event.stopPropagation();
                setDeletingVocabularyControlIndex(row.original.formIndex);
              }}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ),
      },
    ],
    [],
  );

  const handleCancel = () => {
    if (mode === "edit" && recordId) {
      navigate(`/master-file/authority-files/subject/detail/${recordId}`);
      return;
    }

    navigate("/master-file/authority-files/subject");
  };

  const handleSubmit = form.handleSubmit(() => {
    if (mode === "edit" && recordId) {
      navigate(`/master-file/authority-files/subject/detail/${recordId}`);
      return;
    }

    navigate("/master-file/authority-files/subject");
  });

  const handleVocabularyControlSubmit = (
    values: SubjectVocabularyControlModalData,
  ) => {
    if (editingVocabularyControlIndex !== null) {
      const currentVocabularyControl =
        vocabularyControls?.[editingVocabularyControlIndex];

      if (!currentVocabularyControl) {
        return;
      }

      update(editingVocabularyControlIndex, {
        ...currentVocabularyControl,
        relatedTerm:
          values.relatedTerm as SubjectVocabularyControl["relatedTerm"],
        vocabulary: values.vocabulary,
        classification: values.classification,
      });
      return;
    }

    vocabularyControlIdSequence.current += 1;

    append({
      id: `subject-vocabulary-control-${vocabularyControlIdSequence.current}`,
      relatedTerm:
        values.relatedTerm as SubjectVocabularyControl["relatedTerm"],
      vocabulary: values.vocabulary,
      classification: values.classification,
    });
  };

  return (
    <PageContainer className="pt-6 pb-32 md:pt-8 md:pb-36">
      <div>
        <h1 className="text-4xl font-medium text-primary">{pageTitle}</h1>
        <SubjectFormBreadcrumb mode={mode} />
      </div>

      <MdUpwardCard className="mt-6 rounded-[18px] p-5">
        <Form {...form}>
          <form id="subject-form" className="space-y-6" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-medium text-grey-100">{pageTitle}</h2>

            <FormSectionField
              label="Subject"
              error={form.formState.errors.subject?.message}
            >
              <Input
                width="full"
                placeholder="Enter Subject"
                {...form.register("subject")}
                className={FORM_INPUT_CLASS}
              />
            </FormSectionField>

            <FormSectionField
              label={<OptionalFieldLabel label="Classification Code" />}
              error={form.formState.errors.classificationCode?.message}
            >
              <Input
                width="full"
                placeholder="Enter Classification Code"
                {...form.register("classificationCode")}
                className={FORM_INPUT_CLASS}
              />
            </FormSectionField>

            <FormSectionField
              label={<OptionalFieldLabel label="Type" />}
              error={form.formState.errors.type?.message}
            >
              <Controller
                control={form.control}
                name="type"
                render={({ field }) => (
                  <Select
                    value={field.value || undefined}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="h-11 w-full rounded-md border-grey-40 bg-white text-base text-grey-100 shadow-none data-[placeholder]:text-grey-70">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent
                      align="start"
                      className="rounded-md border-grey-30"
                    >
                      {SUBJECT_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </FormSectionField>

            <FormSectionField
              label={<OptionalFieldLabel label="Authority Files" />}
              error={form.formState.errors.authorityFiles?.message}
            >
              <Input
                width="full"
                placeholder="Enter Authority Files"
                {...form.register("authorityFiles")}
                className={FORM_INPUT_CLASS}
              />
            </FormSectionField>

            <div className="space-y-5">
              <h3 className="text-2xl font-medium text-grey-100">
                Vocabulary Control
              </h3>

              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="w-full lg:max-w-[300px]">
                  <SearchInput
                    value={vocabularySearch}
                    placeholder="Search"
                    allowClear
                    onChange={(event) =>
                      setVocabularySearch(event.target.value)
                    }
                    onClear={() => setVocabularySearch("")}
                  />
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="h-11 self-start px-5 lg:self-auto"
                  onClick={() => {
                    setEditingVocabularyControlIndex(null);
                    setIsVocabularyModalOpen(true);
                  }}
                >
                  <Plus className="size-4" />
                  Add
                </Button>
              </div>

              <DataTable
                className="overflow-hidden rounded-md border border-grey-30"
                columns={vocabularyControlColumns}
                data={vocabularyControlPageRows}
                emptyMessage="No data."
              />

              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-3 text-base text-grey-90">
                  <span>Showing</span>
                  <Select
                    value={String(vocabularyPageSize)}
                    onValueChange={(value) =>
                      setVocabularyPageSize(Number(value))
                    }
                  >
                    <SelectTrigger className="h-10 min-w-20 rounded-md border-grey-50 bg-white text-grey-100 shadow-none">
                      <SelectValue placeholder={String(vocabularyPageSize)} />
                    </SelectTrigger>
                    <SelectContent
                      align="start"
                      className="rounded-md border-grey-30"
                    >
                      {PAGE_SIZE_OPTIONS.map((option) => (
                        <SelectItem key={option} value={String(option)}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <p className="text-base text-grey-90">
                  {filteredVocabularyControls.length === 0
                    ? "0 of 0"
                    : `1 - ${vocabularyControlPageRows.length} of ${filteredVocabularyControls.length}`}
                </p>
              </div>
            </div>
          </form>
        </Form>
      </MdUpwardCard>

      <SubjectFormActionBar sidebarOpen={sidebarOpen} onCancel={handleCancel} />

      <SubjectVocabularyControlModal
        open={isVocabularyModalOpen}
        mode={editingVocabularyControlIndex === null ? "create" : "edit"}
        initialState={vocabularyControlModalInitialState}
        onOpenChange={(open) => {
          setIsVocabularyModalOpen(open);

          if (!open) {
            setEditingVocabularyControlIndex(null);
          }
        }}
        onSubmit={handleVocabularyControlSubmit}
      />

      <SubjectVocabularyDeleteModal
        open={deletingVocabularyControlIndex !== null}
        onOpenChange={(open) => {
          if (!open) {
            setDeletingVocabularyControlIndex(null);
          }
        }}
        onDelete={() => {
          if (deletingVocabularyControlIndex === null) {
            return;
          }

          remove(deletingVocabularyControlIndex);
          setDeletingVocabularyControlIndex(null);
        }}
      />
    </PageContainer>
  );
}
