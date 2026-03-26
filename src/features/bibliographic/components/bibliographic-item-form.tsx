"use client";

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
import { cn } from "@/shared/lib/cn";
import type {
  BibliographicItemFormProps,
  BibliographicItemFormSelectOption as SelectOption,
  ItemFormValues,
} from "@/features/bibliographic/types/bibliographic-item-form.types";
import { Calendar } from "lucide-react";
import { useEffect, useMemo, type ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const FORM_INPUT_CLASS =
  "h-10.5 rounded-md border-grey-40 bg-white text-base text-grey-100 placeholder:text-grey-70 shadow-none";
const FORM_SELECT_TRIGGER_CLASS =
  "h-10.5 w-full rounded-md border-grey-40 bg-white text-base text-grey-100 shadow-none data-[placeholder]:text-grey-70";

const LOCATION_OPTIONS: SelectOption[] = [
  { value: "my-library", label: "My Library" },
  { value: "branch-library", label: "Branch Library" },
  { value: "digital-shelf", label: "Digital Shelf" },
];

const COLLECTION_TYPE_OPTIONS: SelectOption[] = [
  { value: "textbook", label: "Textbook" },
  { value: "reference", label: "Reference" },
  { value: "general", label: "General Collection" },
];

const ITEM_STATUS_OPTIONS: SelectOption[] = [
  { value: "available", label: "Available" },
  { value: "on-loan", label: "On Loan" },
  { value: "reserved", label: "Reserved" },
];

const SUPPLIER_OPTIONS: SelectOption[] = [
  { value: "not-applicable", label: "Not Applicable" },
  { value: "gramedia", label: "Gramedia" },
  { value: "mizan", label: "Mizan" },
];

const CURRENCY_OPTIONS: SelectOption[] = [
  { value: "idr", label: "Rp" },
  { value: "usd", label: "USD" },
];

const DEFAULT_ITEM_FORM_VALUES: ItemFormValues = {
  title: "The Let Them Theory",
  itemCode: "P00020S",
  inventoryCode: "",
  location: "my-library",
  shelfLocation: "",
  collectionType: "textbook",
  itemStatus: "available",
  orderNumber: "",
  orderDate: "16-03-2026",
  receivingDate: "16-03-2026",
  supplier: "not-applicable",
  source: "buy",
  invoice: "",
  invoiceDate: "16-03-2026",
  priceCurrency: "idr",
  price: "",
};

const ITEM_FORM_VALUES_BY_ID: Record<string, ItemFormValues> = {
  "item-1": DEFAULT_ITEM_FORM_VALUES,
  "item-2": {
    ...DEFAULT_ITEM_FORM_VALUES,
    itemCode: "P00012S",
  },
  "item-3": {
    ...DEFAULT_ITEM_FORM_VALUES,
    itemCode: "P00013S",
  },
};

function cloneItemValues(values: ItemFormValues): ItemFormValues {
  return { ...values };
}

function FieldLabel({ children }: { children: ReactNode }) {
  return <Label className="text-sm font-medium text-grey-100">{children}</Label>;
}

function FormSectionField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <FieldLabel>{label}</FieldLabel>
      {children}
    </div>
  );
}

function ItemEditBreadcrumb() {
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
            Edit Item
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function DateLikeField({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative">
      <Input
        width="full"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={cn(FORM_INPUT_CLASS, "pr-11")}
      />
      <Calendar className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-grey-80" />
    </div>
  );
}

function FormSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
}) {
  return (
    <Select value={value || undefined} onValueChange={onChange}>
      <SelectTrigger className={FORM_SELECT_TRIGGER_CLASS}>
        <SelectValue placeholder="Select" />
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

export function BibliographicItemForm({
  itemId = "item-1",
  pageTitle = "Edit Item",
}: BibliographicItemFormProps) {
  const defaultValues = useMemo(
    () =>
      cloneItemValues(
        ITEM_FORM_VALUES_BY_ID[itemId] ?? DEFAULT_ITEM_FORM_VALUES,
      ),
    [itemId],
  );

  const form = useForm<ItemFormValues>({
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  return (
    <PageContainer className="pt-6 pb-10 md:pt-8">
      <div>
        <h1 className="text-4xl font-medium text-primary">{pageTitle}</h1>
        <ItemEditBreadcrumb />
      </div>

      <MdUpwardCard className="mt-6 rounded-[18px] p-4 md:p-5">
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={(event) => event.preventDefault()}
          >
            <h2 className="text-2xl font-medium text-grey-100">{pageTitle}</h2>

            <FormSectionField label="Title">
              <Input
                width="full"
                disabled
                {...form.register("title")}
                className={FORM_INPUT_CLASS}
              />
            </FormSectionField>

            <FormSectionField label="Item Code">
              <Input
                width="full"
                {...form.register("itemCode")}
                className={FORM_INPUT_CLASS}
              />
            </FormSectionField>

            <FormSectionField label="Inventory Code">
              <Input
                width="full"
                {...form.register("inventoryCode")}
                placeholder="Enter Inventory Code"
                className={FORM_INPUT_CLASS}
              />
            </FormSectionField>

            <FormSectionField label="Location">
              <Controller
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormSelect
                    value={field.value}
                    onChange={field.onChange}
                    options={LOCATION_OPTIONS}
                  />
                )}
              />
            </FormSectionField>

            <FormSectionField label="Shelf Location">
              <Input
                width="full"
                {...form.register("shelfLocation")}
                placeholder="Enter Shelf Location"
                className={FORM_INPUT_CLASS}
              />
            </FormSectionField>

            <FormSectionField label="Collection Type">
              <Controller
                control={form.control}
                name="collectionType"
                render={({ field }) => (
                  <FormSelect
                    value={field.value}
                    onChange={field.onChange}
                    options={COLLECTION_TYPE_OPTIONS}
                  />
                )}
              />
            </FormSectionField>

            <FormSectionField label="Item Status">
              <Controller
                control={form.control}
                name="itemStatus"
                render={({ field }) => (
                  <FormSelect
                    value={field.value}
                    onChange={field.onChange}
                    options={ITEM_STATUS_OPTIONS}
                  />
                )}
              />
            </FormSectionField>

            <FormSectionField label="Order Number">
              <Input
                width="full"
                {...form.register("orderNumber")}
                placeholder="Enter Order Number"
                className={FORM_INPUT_CLASS}
              />
            </FormSectionField>

            <div className="grid gap-4 md:grid-cols-2">
              <FormSectionField label="Order Date">
                <Controller
                  control={form.control}
                  name="orderDate"
                  render={({ field }) => (
                    <DateLikeField
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="DD-MM-YYYY"
                    />
                  )}
                />
              </FormSectionField>

              <FormSectionField label="Receiving Date">
                <Controller
                  control={form.control}
                  name="receivingDate"
                  render={({ field }) => (
                    <DateLikeField
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="DD-MM-YYYY"
                    />
                  )}
                />
              </FormSectionField>
            </div>

            <FormSectionField label="Supplier">
              <Controller
                control={form.control}
                name="supplier"
                render={({ field }) => (
                  <FormSelect
                    value={field.value}
                    onChange={field.onChange}
                    options={SUPPLIER_OPTIONS}
                  />
                )}
              />
            </FormSectionField>

            <FormSectionField label="Source">
              <Controller
                control={form.control}
                name="source"
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="gap-3"
                  >
                    <label
                      htmlFor="source-buy"
                      className="flex items-center gap-2 text-base font-normal text-grey-100"
                    >
                      <RadioGroupItem id="source-buy" value="buy" />
                      Buy
                    </label>
                    <label
                      htmlFor="source-prize-grant"
                      className="flex items-center gap-2 text-base font-normal text-grey-100"
                    >
                      <RadioGroupItem
                        id="source-prize-grant"
                        value="prize-grant"
                      />
                      Prize/Grant
                    </label>
                  </RadioGroup>
                )}
              />
            </FormSectionField>

            <div className="grid gap-4 md:grid-cols-2">
              <FormSectionField label="Invoice">
                <Input
                  width="full"
                  {...form.register("invoice")}
                  placeholder="Enter Invoice"
                  className={FORM_INPUT_CLASS}
                />
              </FormSectionField>

              <FormSectionField label="Invoice Date">
                <Controller
                  control={form.control}
                  name="invoiceDate"
                  render={({ field }) => (
                    <DateLikeField
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="DD-MM-YYYY"
                    />
                  )}
                />
              </FormSectionField>
            </div>

            <FormSectionField label="Price">
              <div className="flex">
                <Controller
                  control={form.control}
                  name="priceCurrency"
                  render={({ field }) => (
                    <Select
                      value={field.value || undefined}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        className={cn(
                          FORM_SELECT_TRIGGER_CLASS,
                          "w-[68px] rounded-r-none border-r-0 px-3",
                        )}
                      >
                        <SelectValue placeholder="Rp" />
                      </SelectTrigger>
                      <SelectContent align="start">
                        {CURRENCY_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <Input
                  width="full"
                  {...form.register("price")}
                  placeholder="Enter Price"
                  className={cn(FORM_INPUT_CLASS, "rounded-l-none border-l-0")}
                />
              </div>
            </FormSectionField>
          </form>
        </Form>
      </MdUpwardCard>
    </PageContainer>
  );
}
