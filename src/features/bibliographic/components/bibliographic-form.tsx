"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Form } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Textarea } from "@/shared/components/ui/textarea";
import { cn } from "@/shared/lib/cn";
import { FileText, Heart, Play, Plus, Trash2, Upload } from "lucide-react";
import {
  Controller,
  useFieldArray,
  useForm,
  useWatch,
  type Control,
} from "react-hook-form";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  type ChangeEvent,
  type ComponentProps,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import {
  bibliographicFormSchema,
  type BibliographicFormAuthorEntry as AuthorEntry,
  type BibliographicFormData,
  type BibliographicFormInitialState,
  type BibliographicFormLabelEntry as LabelEntry,
  type BibliographicFormSubjectEntry as SubjectEntry,
  type BibliographicFormValues,
} from "./bibliographic-form-presets";

type SelectOption = {
  value: string;
  label: string;
};

type BibliographicFormProps = {
  pageTitle: string;
  initialState: BibliographicFormInitialState;
};

type ScalarFieldName = keyof BibliographicFormValues;

const FORM_INPUT_CLASS =
  "h-10.5 rounded-md border-grey-40 bg-white text-base text-grey-100 placeholder:text-grey-70 shadow-none";
const FORM_SELECT_TRIGGER_CLASS =
  "h-10.5 w-full rounded-md border-grey-40 bg-white text-base text-grey-100 shadow-none data-[placeholder]:text-grey-70";
const FORM_TEXTAREA_CLASS =
  "min-h-28 rounded-md border-grey-40 bg-white text-base text-grey-100 placeholder:text-grey-70 shadow-none";
const TABLE_INPUT_CLASS =
  "h-9.5 rounded-md border-grey-40 bg-white text-base text-grey-100 placeholder:text-grey-70 shadow-none";
const TABLE_SELECT_TRIGGER_CLASS =
  "h-9.5 w-full rounded-md border-grey-40 bg-white text-base text-grey-100 shadow-none data-[placeholder]:text-grey-70";

const AUTHOR_TYPE_OPTIONS: SelectOption[] = [
  { value: "personal-name", label: "Personal Name" },
  { value: "organization", label: "Organization" },
  { value: "conference", label: "Conference" },
];

const AUTHOR_CLASSIFICATION_OPTIONS: SelectOption[] = [
  { value: "primary-author", label: "Primary Author" },
  { value: "co-author", label: "Co Author" },
  { value: "editor", label: "Editor" },
];

const SUBJECT_TYPE_OPTIONS: SelectOption[] = [
  { value: "topical", label: "Topical" },
  { value: "geographic", label: "Geographic" },
  { value: "personal-name", label: "Personal Name" },
];

const SUBJECT_CLASSIFICATION_OPTIONS: SelectOption[] = [
  { value: "main-subject", label: "Main Subject" },
  { value: "additional-subject", label: "Additional Subject" },
  { value: "keyword", label: "Keyword" },
];

const PATTERN_OPTIONS: SelectOption[] = [
  { value: "p00000s", label: "P00000S" },
  { value: "p00000b", label: "P00000B" },
  { value: "p00000m", label: "P00000M" },
];

const GMD_OPTIONS: SelectOption[] = [
  { value: "text", label: "Text" },
  { value: "audio", label: "Audio" },
  { value: "video", label: "Video" },
];

const CONTENT_TYPE_OPTIONS: SelectOption[] = [
  { value: "text", label: "Text" },
  { value: "still-image", label: "Still Image" },
  { value: "spoken-word", label: "Spoken Word" },
];

const MEDIA_TYPE_OPTIONS: SelectOption[] = [
  { value: "unmediated", label: "Unmediated" },
  { value: "audio", label: "Audio" },
  { value: "computer", label: "Computer" },
];

const CARRIER_TYPE_OPTIONS: SelectOption[] = [
  { value: "volume", label: "Volume" },
  { value: "audio-disk", label: "Audio Disk" },
  { value: "online-resource", label: "Online Resource" },
];

const FREQUENCY_OPTIONS: SelectOption[] = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

const PUBLISHER_OPTIONS: SelectOption[] = [
  { value: "gramedia", label: "Gramedia" },
  { value: "bentang-pustaka", label: "Bentang Pustaka" },
  { value: "mizan", label: "Mizan" },
];

const PUBLISHER_PLACE_OPTIONS: SelectOption[] = [
  { value: "jakarta", label: "Jakarta" },
  { value: "bandung", label: "Bandung" },
  { value: "yogyakarta", label: "Yogyakarta" },
];

const CLASSIFICATION_OPTIONS: SelectOption[] = [
  { value: "000-general", label: "000 Generalities" },
  { value: "100-philosophy", label: "100 Philosophy" },
  { value: "300-social", label: "300 Social Sciences" },
];

const LANGUAGE_OPTIONS: SelectOption[] = [
  { value: "indonesia", label: "Indonesia" },
  { value: "english", label: "English" },
  { value: "arabic", label: "Arabic" },
];

const RELATED_BIBLIO_DATA_OPTIONS: SelectOption[] = [
  { value: "direct-source", label: "The Direct Source" },
  { value: "radical-acceptance", label: "Radical Acceptance & Letting Go" },
  { value: "boundaries", label: "Boundaries & Relationships" },
];

let authorEntryCounter = 1;
let subjectEntryCounter = 1;

function createAuthorEntry(): AuthorEntry {
  return {
    id: `author-${authorEntryCounter++}`,
    name: "",
    authorType: "",
    classification: "",
  };
}

function createSubjectEntry(): SubjectEntry {
  return {
    id: `subject-${subjectEntryCounter++}`,
    subject: "",
    subjectType: "",
    classification: "",
  };
}

function cloneInitialState(
  initialState: BibliographicFormInitialState,
): BibliographicFormInitialState {
  return {
    ...initialState,
    authors: initialState.authors.map((author) => ({ ...author })),
    subjects: initialState.subjects.map((subject) => ({ ...subject })),
    labels: initialState.labels.map((label) => ({ ...label })),
    attachment: initialState.attachment ? { ...initialState.attachment } : null,
  };
}

function formatFileSize(size: number) {
  if (size >= 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }

  return `${Math.max(1, Math.round(size / 1024))} KB`;
}

function FieldLabel({
  label,
  optional = false,
}: {
  label: string;
  optional?: boolean;
}) {
  return (
    <Label className="text-sm font-medium text-grey-100">
      <span>{label}</span>
      {optional ? (
        <span className="text-sm font-normal text-grey-70">(opsional)</span>
      ) : null}
    </Label>
  );
}

function FieldErrorText({
  message,
  className,
}: {
  message?: string;
  className?: string;
}) {
  if (!message) {
    return null;
  }

  return <p className={cn("text-sm text-destructive", className)}>{message}</p>;
}

function FormSectionField({
  label,
  optional = false,
  hint,
  children,
}: {
  label: string;
  optional?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <FieldLabel label={label} optional={optional} />
      {hint ? <p className="text-sm text-grey-70">{hint}</p> : null}
      {children}
    </div>
  );
}

function FormSelect({
  value,
  onChange,
  placeholder = "Select",
  options,
  triggerClassName,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options: SelectOption[];
  triggerClassName?: string;
}) {
  return (
    <Select value={value || undefined} onValueChange={onChange}>
      <SelectTrigger
        className={cn(FORM_SELECT_TRIGGER_CLASS, triggerClassName)}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent align="start">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function ControlledInputField({
  control,
  name,
  placeholder,
  className = FORM_INPUT_CLASS,
  inputMode,
}: {
  control: Control<BibliographicFormData>;
  name: ScalarFieldName;
  placeholder: string;
  className?: string;
  inputMode?: ComponentProps<"input">["inputMode"];
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <>
          <Input
            width="full"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            placeholder={placeholder}
            className={className}
            inputMode={inputMode}
          />
          <FieldErrorText message={fieldState.error?.message} />
        </>
      )}
    />
  );
}

function ControlledSelectField({
  control,
  name,
  options,
  placeholder = "Select",
  triggerClassName,
}: {
  control: Control<BibliographicFormData>;
  name: ScalarFieldName;
  options: SelectOption[];
  placeholder?: string;
  triggerClassName?: string;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <>
          <FormSelect
            value={field.value}
            onChange={field.onChange}
            placeholder={placeholder}
            options={options}
            triggerClassName={triggerClassName}
          />
          <FieldErrorText message={fieldState.error?.message} />
        </>
      )}
    />
  );
}

function ControlledTextareaField({
  control,
  name,
  placeholder,
  className = FORM_TEXTAREA_CLASS,
}: {
  control: Control<BibliographicFormData>;
  name: ScalarFieldName;
  placeholder: string;
  className?: string;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <>
          <Textarea
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            placeholder={placeholder}
            className={className}
          />
          <FieldErrorText message={fieldState.error?.message} />
        </>
      )}
    />
  );
}

function BibliographicFormBreadcrumb({ title }: { title: string }) {
  return (
    <Breadcrumb className="mt-2">
      <BreadcrumbList className="text-sm text-grey-80">
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="hover:text-blue-50">
            <Link to="/bibliographic">Bibliography</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-grey-70" />
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="hover:text-blue-50">
            <Link to="/bibliographic/list">Bibliography List</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-grey-70" />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-medium text-blue-50">
            {title}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function LabelIcon({ type }: { type: LabelEntry["icon"] }) {
  if (type === "play") {
    return <Play className="size-4 fill-current text-blue-50" />;
  }

  return <Heart className="size-4 fill-current text-blue-50" />;
}

export function BibliographicForm({
  pageTitle,
  initialState,
}: BibliographicFormProps) {
  const attachmentInputId = useId();
  const attachmentInputRef = useRef<HTMLInputElement>(null);
  const defaultValues = useMemo(
    () => cloneInitialState(initialState),
    [initialState],
  );

  const form = useForm<BibliographicFormData>({
    resolver: zodResolver(bibliographicFormSchema),
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const {
    fields: authorFields,
    append: appendAuthor,
    remove: removeAuthor,
    replace: replaceAuthors,
  } = useFieldArray({
    control: form.control,
    name: "authors",
    keyName: "fieldKey",
  });
  const {
    fields: subjectFields,
    append: appendSubject,
    remove: removeSubject,
    replace: replaceSubjects,
  } = useFieldArray({
    control: form.control,
    name: "subjects",
    keyName: "fieldKey",
  });
  const {
    fields: labelFields,
  } = useFieldArray({
    control: form.control,
    name: "labels",
    keyName: "fieldKey",
  });

  const labels = useWatch({
    control: form.control,
    name: "labels",
  });
  const attachment = useWatch({
    control: form.control,
    name: "attachment",
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const handleAttachmentChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null;
    form.setValue(
      "attachment",
      nextFile ? { name: nextFile.name, size: nextFile.size } : null,
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );

    event.target.value = "";
  };

  const handleRemoveAttachment = () => {
    form.setValue("attachment", null, {
      shouldDirty: true,
      shouldValidate: true,
    });

    if (attachmentInputRef.current) {
      attachmentInputRef.current.value = "";
    }
  };

  const handleRemoveAuthorEntry = (index: number) => {
    if (authorFields.length === 1) {
      replaceAuthors([createAuthorEntry()]);
      return;
    }

    removeAuthor(index);
  };

  const handleRemoveSubjectEntry = (index: number) => {
    if (subjectFields.length === 1) {
      replaceSubjects([createSubjectEntry()]);
      return;
    }

    removeSubject(index);
  };

  return (
    <PageContainer className="pt-6 pb-10 md:pt-8">
      <div>
        <h1 className="text-3xl font-medium text-primary">{pageTitle}</h1>
        <BibliographicFormBreadcrumb title={pageTitle} />
      </div>

      <MdUpwardCard className="mt-5 p-4 md:p-6">
        <Form {...form}>
          <form
            noValidate
            onSubmit={form.handleSubmit(() => undefined)}
            className="space-y-4"
          >
            <h2 className="text-xl font-medium text-grey-100">{pageTitle}</h2>

            <FormSectionField label="Title">
              <ControlledInputField
                control={form.control}
                name="title"
                placeholder="Enter Title"
              />
            </FormSectionField>

            <FormSectionField
              label="Author(s)"
              hint="Type to search for existing authors or to add a new one."
            >
              <div className="overflow-hidden rounded-md border border-grey-40">
                <Table>
                  <TableHeader className="bg-grey-30">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-14 px-3 text-sm font-semibold text-grey-90">
                        No.
                      </TableHead>
                      <TableHead className="px-3 text-sm font-semibold text-grey-90">
                        Author Name
                      </TableHead>
                      <TableHead className="w-[220px] px-3 text-sm font-semibold text-grey-90">
                        Author Type
                      </TableHead>
                      <TableHead className="w-[220px] px-3 text-sm font-semibold text-grey-90">
                        Classification
                      </TableHead>
                      <TableHead className="w-16 px-3 text-right text-sm font-semibold text-grey-90">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {authorFields.map((author, index) => (
                      <TableRow
                        key={author.fieldKey}
                        className="hover:bg-transparent"
                      >
                        <TableCell className="px-3 py-2.5 text-sm text-grey-90">
                          {index + 1}.
                        </TableCell>
                        <TableCell className="px-3 py-2.5 whitespace-normal">
                          <Controller
                            control={form.control}
                            name={`authors.${index}.name` as const}
                            render={({ field, fieldState }) => (
                              <div className="space-y-1">
                                <Input
                                  width="full"
                                  value={field.value}
                                  onChange={field.onChange}
                                  onBlur={field.onBlur}
                                  placeholder="Enter Author Name"
                                  className={TABLE_INPUT_CLASS}
                                />
                                <FieldErrorText
                                  message={fieldState.error?.message}
                                  className="text-xs"
                                />
                              </div>
                            )}
                          />
                        </TableCell>
                        <TableCell className="px-3 py-2.5 whitespace-normal">
                          <Controller
                            control={form.control}
                            name={`authors.${index}.authorType` as const}
                            render={({ field, fieldState }) => (
                              <div className="space-y-1">
                                <Select
                                  value={field.value || undefined}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger
                                    className={TABLE_SELECT_TRIGGER_CLASS}
                                  >
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                  <SelectContent align="start">
                                    {AUTHOR_TYPE_OPTIONS.map((option) => (
                                      <SelectItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FieldErrorText
                                  message={fieldState.error?.message}
                                  className="text-xs"
                                />
                              </div>
                            )}
                          />
                        </TableCell>
                        <TableCell className="px-3 py-2.5 whitespace-normal">
                          <Controller
                            control={form.control}
                            name={`authors.${index}.classification` as const}
                            render={({ field, fieldState }) => (
                              <div className="space-y-1">
                                <Select
                                  value={field.value || undefined}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger
                                    className={TABLE_SELECT_TRIGGER_CLASS}
                                  >
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                  <SelectContent align="start">
                                    {AUTHOR_CLASSIFICATION_OPTIONS.map(
                                      (option) => (
                                        <SelectItem
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </SelectItem>
                                      ),
                                    )}
                                  </SelectContent>
                                </Select>
                                <FieldErrorText
                                  message={fieldState.error?.message}
                                  className="text-xs"
                                />
                              </div>
                            )}
                          />
                        </TableCell>
                        <TableCell className="px-3 py-2.5 text-right">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            className="text-grey-70 hover:bg-red-10 hover:text-red-60"
                            aria-label="Remove author"
                            onClick={() => handleRemoveAuthorEntry(index)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Button
                type="button"
                variant="ghost"
                className="h-auto px-0 py-0 text-sm font-medium text-blue-50 hover:bg-transparent hover:text-blue-70"
                onClick={() => appendAuthor(createAuthorEntry())}
              >
                <Plus className="size-4" />
                Add Author
              </Button>
            </FormSectionField>

            <FormSectionField label="Statement of Responsibility" optional>
              <ControlledInputField
                control={form.control}
                name="statementOfResponsibility"
                placeholder="Enter Title"
              />
            </FormSectionField>

            <FormSectionField label="Edition" optional>
              <ControlledInputField
                control={form.control}
                name="edition"
                placeholder="Enter Title"
              />
            </FormSectionField>

            <FormSectionField label="Specific Detail Info" optional>
              <ControlledInputField
                control={form.control}
                name="specificDetailInfo"
                placeholder="Enter Title"
              />
            </FormSectionField>

            <div className="grid gap-4 md:grid-cols-[1fr_340px]">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <FieldLabel label="Item(s) code batch generator" />
                  <Button
                    type="button"
                    variant="ghost"
                    className="h-auto px-0 py-0 text-sm font-medium text-blue-50 hover:bg-transparent hover:text-blue-70"
                  >
                    <Plus className="size-4" />
                    Add New Pattern
                  </Button>
                </div>
                <ControlledSelectField
                  control={form.control}
                  name="itemCodeBatchGenerator"
                  options={PATTERN_OPTIONS}
                />
              </div>

              <FormSectionField label="Total Item(s)">
                <ControlledInputField
                  control={form.control}
                  name="totalItems"
                  placeholder="Enter Total Item(s)"
                  inputMode="numeric"
                />
              </FormSectionField>
            </div>

            <FormSectionField label="GMD">
              <ControlledSelectField
                control={form.control}
                name="gmd"
                options={GMD_OPTIONS}
              />
            </FormSectionField>

            <FormSectionField label="Content Type">
              <ControlledSelectField
                control={form.control}
                name="contentType"
                options={CONTENT_TYPE_OPTIONS}
              />
            </FormSectionField>

            <FormSectionField label="Media Type">
              <ControlledSelectField
                control={form.control}
                name="mediaType"
                options={MEDIA_TYPE_OPTIONS}
              />
            </FormSectionField>

            <FormSectionField label="Carrier Type">
              <ControlledSelectField
                control={form.control}
                name="carrierType"
                options={CARRIER_TYPE_OPTIONS}
              />
            </FormSectionField>

            <FormSectionField
              label="Frequency"
              hint="Use this for Serial publication."
            >
              <ControlledSelectField
                control={form.control}
                name="frequency"
                options={FREQUENCY_OPTIONS}
              />
            </FormSectionField>

            <FormSectionField label="ISBN/ISSN">
              <ControlledInputField
                control={form.control}
                name="isbnIssn"
                placeholder="Enter ISBN/ISSN"
              />
            </FormSectionField>

            <div className="grid gap-4 md:grid-cols-3">
              <FormSectionField label="Publisher">
                <ControlledSelectField
                  control={form.control}
                  name="publisher"
                  options={PUBLISHER_OPTIONS}
                />
              </FormSectionField>

              <FormSectionField label="Publishing Year">
                <ControlledInputField
                  control={form.control}
                  name="publishingYear"
                  placeholder="Enter Publishing Year"
                  inputMode="numeric"
                />
              </FormSectionField>

              <FormSectionField label="Publisher Place">
                <ControlledSelectField
                  control={form.control}
                  name="publisherPlace"
                  options={PUBLISHER_PLACE_OPTIONS}
                />
              </FormSectionField>
            </div>

            <FormSectionField label="Collation">
              <ControlledInputField
                control={form.control}
                name="collation"
                placeholder="Enter Collation"
              />
            </FormSectionField>

            <FormSectionField label="Series Title">
              <ControlledInputField
                control={form.control}
                name="seriesTitle"
                placeholder="Enter Series Title"
              />
            </FormSectionField>

            <FormSectionField label="Classification">
              <ControlledSelectField
                control={form.control}
                name="classification"
                options={CLASSIFICATION_OPTIONS}
              />
            </FormSectionField>

            <FormSectionField label="Call Number">
              <ControlledInputField
                control={form.control}
                name="callNumber"
                placeholder="Enter Call Number"
              />
            </FormSectionField>

            <FormSectionField
              label="Subject(s)"
              hint="Type to search for existing authors or to add a new one."
            >
              <div className="overflow-hidden rounded-md border border-grey-40">
                <Table>
                  <TableHeader className="bg-grey-30">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-14 px-3 text-sm font-semibold text-grey-90">
                        No.
                      </TableHead>
                      <TableHead className="px-3 text-sm font-semibold text-grey-90">
                        Subject
                      </TableHead>
                      <TableHead className="w-[220px] px-3 text-sm font-semibold text-grey-90">
                        Subject Type
                      </TableHead>
                      <TableHead className="w-[220px] px-3 text-sm font-semibold text-grey-90">
                        Classification
                      </TableHead>
                      <TableHead className="w-16 px-3 text-right text-sm font-semibold text-grey-90">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subjectFields.map((subject, index) => (
                      <TableRow
                        key={subject.fieldKey}
                        className="hover:bg-transparent"
                      >
                        <TableCell className="px-3 py-2.5 text-sm text-grey-90">
                          {index + 1}.
                        </TableCell>
                        <TableCell className="px-3 py-2.5 whitespace-normal">
                          <Controller
                            control={form.control}
                            name={`subjects.${index}.subject` as const}
                            render={({ field, fieldState }) => (
                              <div className="space-y-1">
                                <Input
                                  width="full"
                                  value={field.value}
                                  onChange={field.onChange}
                                  onBlur={field.onBlur}
                                  placeholder="Enter Subject"
                                  className={TABLE_INPUT_CLASS}
                                />
                                <FieldErrorText
                                  message={fieldState.error?.message}
                                  className="text-xs"
                                />
                              </div>
                            )}
                          />
                        </TableCell>
                        <TableCell className="px-3 py-2.5 whitespace-normal">
                          <Controller
                            control={form.control}
                            name={`subjects.${index}.subjectType` as const}
                            render={({ field, fieldState }) => (
                              <div className="space-y-1">
                                <Select
                                  value={field.value || undefined}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger
                                    className={TABLE_SELECT_TRIGGER_CLASS}
                                  >
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                  <SelectContent align="start">
                                    {SUBJECT_TYPE_OPTIONS.map((option) => (
                                      <SelectItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FieldErrorText
                                  message={fieldState.error?.message}
                                  className="text-xs"
                                />
                              </div>
                            )}
                          />
                        </TableCell>
                        <TableCell className="px-3 py-2.5 whitespace-normal">
                          <Controller
                            control={form.control}
                            name={`subjects.${index}.classification` as const}
                            render={({ field, fieldState }) => (
                              <div className="space-y-1">
                                <Select
                                  value={field.value || undefined}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger
                                    className={TABLE_SELECT_TRIGGER_CLASS}
                                  >
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                  <SelectContent align="start">
                                    {SUBJECT_CLASSIFICATION_OPTIONS.map(
                                      (option) => (
                                        <SelectItem
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </SelectItem>
                                      ),
                                    )}
                                  </SelectContent>
                                </Select>
                                <FieldErrorText
                                  message={fieldState.error?.message}
                                  className="text-xs"
                                />
                              </div>
                            )}
                          />
                        </TableCell>
                        <TableCell className="px-3 py-2.5 text-right">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            className="text-grey-70 hover:bg-red-10 hover:text-red-60"
                            aria-label="Remove subject"
                            onClick={() => handleRemoveSubjectEntry(index)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Button
                type="button"
                variant="ghost"
                className="h-auto px-0 py-0 text-sm font-medium text-blue-50 hover:bg-transparent hover:text-blue-70"
                onClick={() => appendSubject(createSubjectEntry())}
              >
                <Plus className="size-4" />
                Add Subject
              </Button>
            </FormSectionField>

            <FormSectionField label="Language">
              <ControlledSelectField
                control={form.control}
                name="language"
                options={LANGUAGE_OPTIONS}
              />
            </FormSectionField>

            <FormSectionField label="Abstract/Notes">
              <ControlledTextareaField
                control={form.control}
                name="abstractNotes"
                placeholder="Enter Abstract/Notes"
              />
            </FormSectionField>

            <div className="space-y-2">
              <FieldLabel label="File Attachment" />

              {attachment ? (
                <div className="flex items-center justify-between rounded-md border border-grey-40 px-3 py-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-green-20 text-green-60">
                      <FileText className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-grey-100">
                        {attachment.name}
                      </p>
                      <p className="text-sm text-grey-70">
                        {formatFileSize(attachment.size)}
                      </p>
                    </div>
                  </div>

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
              ) : (
                <>
                  <label
                    htmlFor={attachmentInputId}
                    className="flex min-h-16 cursor-pointer items-center justify-center rounded-md border border-dashed border-grey-50 px-4 text-center transition-colors hover:border-blue-30 hover:bg-blue-10/50"
                  >
                    <span className="flex flex-wrap items-center justify-center gap-2 text-sm text-grey-90">
                      <Upload className="size-4 text-blue-50" />
                      <span>Sisipkan dokumen atau</span>
                      <span className="font-medium text-blue-50">Unggah</span>
                    </span>
                  </label>

                  <div className="flex items-center justify-between text-sm text-grey-70">
                    <span>Format: PDF</span>
                    <span>Maks. 10 MB</span>
                  </div>
                </>
              )}

              <FieldErrorText
                message={form.formState.errors.attachment?.message}
              />

              <input
                ref={attachmentInputRef}
                id={attachmentInputId}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                className="hidden"
                onChange={handleAttachmentChange}
              />
            </div>

            <FormSectionField
              label="Related Biblio Data"
              hint="Type to search for existing authors or to add a new one."
            >
              <ControlledSelectField
                control={form.control}
                name="relatedBiblioData"
                options={RELATED_BIBLIO_DATA_OPTIONS}
              />
            </FormSectionField>

            <div className="space-y-3">
              <FieldLabel label="Hide in OPAC" />
              <Controller
                control={form.control}
                name="hideInOpac"
                render={({ field, fieldState }) => (
                  <>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="gap-3"
                    >
                      <label
                        htmlFor="hide-in-opac-show"
                        className="flex items-center gap-2 text-base font-normal text-grey-100"
                      >
                        <RadioGroupItem id="hide-in-opac-show" value="show" />
                        Show
                      </label>
                      <label
                        htmlFor="hide-in-opac-hide"
                        className="flex items-center gap-2 text-base font-normal text-grey-100"
                      >
                        <RadioGroupItem id="hide-in-opac-hide" value="hide" />
                        Hide
                      </label>
                    </RadioGroup>
                    <FieldErrorText message={fieldState.error?.message} />
                  </>
                )}
              />
            </div>

            <div className="space-y-3">
              <FieldLabel label="Promote To Homepage" />
              <Controller
                control={form.control}
                name="promoteToHomepage"
                render={({ field, fieldState }) => (
                  <>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="gap-3"
                    >
                      <label
                        htmlFor="promote-homepage-no"
                        className="flex items-center gap-2 text-base font-normal text-grey-100"
                      >
                        <RadioGroupItem
                          id="promote-homepage-no"
                          value="dont-promote"
                        />
                        Don&apos;t Promote
                      </label>
                      <label
                        htmlFor="promote-homepage-yes"
                        className="flex items-center gap-2 text-base font-normal text-grey-100"
                      >
                        <RadioGroupItem
                          id="promote-homepage-yes"
                          value="promote"
                        />
                        Promote
                      </label>
                    </RadioGroup>
                    <FieldErrorText message={fieldState.error?.message} />
                  </>
                )}
              />
            </div>

            <div className="space-y-3">
              <FieldLabel label="Label" />

              <div className="space-y-2">
                {labelFields.map((entry, index) => (
                  <div
                    key={entry.fieldKey}
                    className={cn(
                      "flex flex-col gap-3 rounded-md px-3 py-2.5 sm:flex-row sm:items-start",
                      labels[index]?.checked ? "bg-blue-10/60" : "bg-transparent",
                    )}
                  >
                    <div className="flex min-w-0 items-center gap-3 sm:w-[200px] sm:min-w-[200px]">
                      <Controller
                        control={form.control}
                        name={`labels.${index}.checked` as const}
                        render={({ field }) => (
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) =>
                              field.onChange(checked === true)
                            }
                          />
                        )}
                      />
                      <div className="flex items-center gap-2">
                        <LabelIcon type={entry.icon} />
                        <span className="text-base font-medium text-grey-100">
                          {entry.label}
                        </span>
                      </div>
                    </div>

                    <Controller
                      control={form.control}
                      name={`labels.${index}.url` as const}
                      render={({ field, fieldState }) => (
                        <div className="w-full space-y-1">
                          <Input
                            width="full"
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            placeholder="Enter a website link/URL to make this label clickable"
                            className={FORM_INPUT_CLASS}
                          />
                          <FieldErrorText
                            message={fieldState.error?.message}
                            className="text-xs"
                          />
                        </div>
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          </form>
        </Form>
      </MdUpwardCard>
    </PageContainer>
  );
}
