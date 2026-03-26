"use client";

import { useUiStore } from "@/app/store/ui.store";
import type {
  CatalogSourceOption,
  CopyCatalogRecord,
  CopyCatalogSelectionBarProps as SelectionBarProps,
  SearchFieldOption,
  SearchFilters,
} from "@/features/bibliographic/types/bibliographic-copy-cataloging.types";
import { PageContainer } from "@/shared/components/common/app-page-container";
import { AppPageHeader } from "@/shared/components/common/app-page-header";
import { DataTable } from "@/shared/components/common/data-table";
import { MdUpwardCard } from "@/shared/components/common/md-upward-card";
import { SearchInput } from "@/shared/components/common/search-input";
import { SelectionCheckbox } from "@/shared/components/common/selection-checkbox";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { cn } from "@/shared/lib/cn";
import { type ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";

const PAGE_SIZE_OPTIONS = [10, 20, 50];
const SEARCH_FIELD_OPTIONS: Array<{
  value: SearchFieldOption;
  label: string;
}> = [
  { value: "all-fields", label: "All Fields" },
  { value: "isbn", label: "ISBN/ISSN" },
  { value: "title-series", label: "Title/Series Title" },
  { value: "authors", label: "Authors" },
];
const CATALOG_SOURCE_OPTIONS: Array<{
  value: CatalogSourceOption;
  label: string;
}> = [
  {
    value: "loc-sru-voyager",
    label: "Library of Congress SRU Voyager",
  },
  {
    value: "slims-library",
    label: "SLIMS Library",
  },
];
const COPY_CATALOG_RECORDS: CopyCatalogRecord[] = [
  {
    id: "copy-1",
    title: "Immigration",
    author: "Free, George D.,",
    isbn: "-",
    gmd: "print",
    collation: "1 p.l., 28 p. 17 cm.",
    publisher: "-",
    publishingYear: "1891",
  },
  {
    id: "copy-2",
    title: "Immigration",
    author: "American international college, Springfield, Mass.",
    isbn: "-",
    gmd: "print",
    collation: "6 v. in 5. illus., pl., ports. 25 cm.",
    publisher: "-",
    publishingYear: "1909",
  },
  {
    id: "copy-3",
    title: "Immigration",
    author: "Edwards, Richard Henry,",
    isbn: "-",
    gmd: "print",
    collation: "32 p. 20 cm",
    publisher: "-",
    publishingYear: "1909",
  },
  {
    id: "copy-4",
    title: "Immigration",
    author: "Duke University.",
    isbn: "-",
    gmd: "print",
    collation: "212-426 p. tables. 27 cm.",
    publisher: "-",
    publishingYear: "1956",
  },
  {
    id: "copy-5",
    title: "Immigration",
    author: "Wisconsin.",
    isbn: "-",
    gmd: "print",
    collation: "6 p. 19 cm.",
    publisher: "-",
    publishingYear: "1908",
  },
  {
    id: "copy-6",
    title: "Immigration",
    author: "Pan American union.",
    isbn: "-",
    gmd: "unmediated",
    collation: "v. illus. 24 cm.",
    publisher: "-",
    publishingYear: "1927",
  },
  {
    id: "copy-7",
    title: "Immigration",
    author: "United States. - Washburne, E. B. (Elihu Benjamin), - United States.",
    isbn: "-",
    gmd: "print",
    collation: "6 p. 24 cm.",
    publisher: "-",
    publishingYear: "1866",
  },
  {
    id: "copy-8",
    title: "Immigration policy handbook",
    author: "National Immigration Forum (U.S.)",
    isbn: "-",
    gmd: "print",
    collation: "v. : ill. ; 28 cm.",
    publisher: "-",
    publishingYear: "2000",
  },
  {
    id: "copy-9",
    title: "Immigration",
    author: "Boyesen, Hjalmar Hjorth,",
    isbn: "-",
    gmd: "print",
    collation: "23 p. 22 cm.",
    publisher: "-",
    publishingYear: "1888",
  },
  {
    id: "copy-10",
    title: "Canada's immigration law",
    author: "Canada.",
    isbn: "625221049",
    gmd: "print",
    collation: "37, 42 p. ; 22 cm.",
    publisher: "-",
    publishingYear: "1996",
  },
];

function matchesSearchField(
  record: CopyCatalogRecord,
  query: string,
  field: SearchFieldOption,
) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) return false;

  if (field === "isbn") {
    return record.isbn.toLowerCase().includes(normalizedQuery);
  }

  if (field === "title-series") {
    return record.title.toLowerCase().includes(normalizedQuery);
  }

  if (field === "authors") {
    return record.author.toLowerCase().includes(normalizedQuery);
  }

  return [
    record.title,
    record.author,
    record.isbn,
    record.gmd,
    record.collation,
    record.publisher,
    record.publishingYear,
  ].some((value) => value.toLowerCase().includes(normalizedQuery));
}

function getTotalResultsCount(filters: SearchFilters, matchedCount: number) {
  if (matchedCount === 0) return 0;

  if (
    filters.source === "loc-sru-voyager" &&
    filters.query.trim().toLowerCase() === "immigration"
  ) {
    return 14940;
  }

  return matchedCount;
}

function CopyCatalogingSelectionBar({
  sidebarOpen,
  onSaveSelected,
}: SelectionBarProps) {
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-grey-30 bg-white/95 shadow-[0_-18px_48px_rgba(15,23,42,0.08)] backdrop-blur",
        sidebarOpen ? "md:left-68" : "md:left-20",
      )}
    >
      <div className="mx-auto flex w-full max-w-310 items-center justify-end px-3 py-4 sm:px-4 md:px-8">
        <Button type="button" size="lg" onClick={onSaveSelected}>
          Save Records to Database
        </Button>
      </div>
    </div>
  );
}

export function BibliographicCopyCatalogingPage() {
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);
  const [draftQuery, setDraftQuery] = useState("immigration");
  const [draftField, setDraftField] = useState<SearchFieldOption>("all-fields");
  const [draftSource, setDraftSource] =
    useState<CatalogSourceOption>("loc-sru-voyager");
  const [submittedFilters, setSubmittedFilters] = useState<SearchFilters>({
    query: "immigration",
    field: "all-fields",
    source: "loc-sru-voyager",
  });
  const [pageSize, setPageSize] = useState(10);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredRecords = useMemo(() => {
    if (!submittedFilters.query.trim()) return [];
    if (submittedFilters.source !== "loc-sru-voyager") return [];

    return COPY_CATALOG_RECORDS.filter((record) =>
      matchesSearchField(record, submittedFilters.query, submittedFilters.field),
    );
  }, [submittedFilters]);

  const displayedRecords = useMemo(
    () => filteredRecords.slice(0, pageSize),
    [filteredRecords, pageSize],
  );
  const currentPageIds = useMemo(
    () => displayedRecords.map((record) => record.id),
    [displayedRecords],
  );
  const selectedIdSet = useMemo(() => new Set(selectedIds), [selectedIds]);
  const selectedCount = selectedIds.length;
  const allCurrentPageSelected =
    currentPageIds.length > 0 &&
    currentPageIds.every((id) => selectedIdSet.has(id));
  const someCurrentPageSelected =
    currentPageIds.some((id) => selectedIdSet.has(id)) &&
    !allCurrentPageSelected;
  const totalResults = getTotalResultsCount(
    submittedFilters,
    filteredRecords.length,
  );
  const from = displayedRecords.length > 0 ? 1 : 0;
  const to = displayedRecords.length;

  const handleSaveSelected = () => {
    setSelectedIds([]);
  };

  const columns = useMemo<ColumnDef<CopyCatalogRecord>[]>(
    () => [
      {
        id: "select",
        meta: {
          headClassName: "w-12 px-3",
          cellClassName: "px-3 py-4",
        },
        header: () => (
          <SelectionCheckbox
            checked={allCurrentPageSelected}
            indeterminate={someCurrentPageSelected}
            onCheckedChange={(checked) => {
              setSelectedIds((current) => {
                if (checked) {
                  return Array.from(new Set([...current, ...currentPageIds]));
                }

                const pageIdSet = new Set(currentPageIds);
                return current.filter((id) => !pageIdSet.has(id));
              });
            }}
            ariaLabel="Select all rows on current page"
          />
        ),
        cell: ({ row }) => (
          <SelectionCheckbox
            checked={selectedIdSet.has(row.original.id)}
            onCheckedChange={(checked) => {
              setSelectedIds((current) => {
                if (checked) {
                  return Array.from(new Set([...current, row.original.id]));
                }

                return current.filter((id) => id !== row.original.id);
              });
            }}
            ariaLabel={`Select ${row.original.title}`}
          />
        ),
      },
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
        accessorKey: "title",
        meta: {
          headClassName: "min-w-[380px]",
          cellClassName: "px-3 py-3.5",
        },
        header: "Title",
        cell: ({ row }) => (
          <div className="min-w-[380px]">
            <p className="text-base font-medium text-grey-100">
              {row.original.title}
            </p>
            <p className="mt-1 text-sm text-grey-70">{row.original.author}</p>
          </div>
        ),
      },
      {
        accessorKey: "isbn",
        meta: {
          headClassName: "w-[120px]",
          cellClassName: "px-3 py-4",
        },
        header: "ISBN/ISSN",
        cell: ({ row }) => (
          <span className="text-base text-grey-90">{row.original.isbn}</span>
        ),
      },
      {
        accessorKey: "gmd",
        meta: {
          headClassName: "w-[100px]",
          cellClassName: "px-3 py-4",
        },
        header: "GMD",
        cell: ({ row }) => (
          <span className="text-base text-grey-90">{row.original.gmd}</span>
        ),
      },
      {
        accessorKey: "collation",
        meta: {
          headClassName: "min-w-[220px]",
          cellClassName: "px-3 py-4",
        },
        header: "Collation",
        cell: ({ row }) => (
          <span className="text-base text-grey-90">{row.original.collation}</span>
        ),
      },
      {
        accessorKey: "publisher",
        meta: {
          headClassName: "w-[120px]",
          cellClassName: "px-3 py-4",
        },
        header: "Publisher",
        cell: ({ row }) => (
          <span className="text-base text-grey-90">
            {row.original.publisher}
          </span>
        ),
      },
      {
        accessorKey: "publishingYear",
        meta: {
          headClassName: "w-[140px]",
          cellClassName: "px-3 py-4",
        },
        header: "Publishing Year",
        cell: ({ row }) => (
          <span className="text-base text-grey-90">
            {row.original.publishingYear}
          </span>
        ),
      },
    ],
    [
      allCurrentPageSelected,
      currentPageIds,
      selectedIdSet,
      someCurrentPageSelected,
    ],
  );

  return (
    <PageContainer
      className={cn(selectedCount > 0 ? "pb-32 md:pb-36" : "pb-10")}
    >
      <AppPageHeader title="Copy Cataloging" />

      <MdUpwardCard className="mt-5 p-4 md:p-5">
        <form
          className="grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_minmax(0,308px)_90px]"
          onSubmit={(event) => {
            event.preventDefault();
            setSelectedIds([]);
            setSubmittedFilters({
              query: draftQuery,
              field: draftField,
              source: draftSource,
            });
          }}
        >
          <SearchInput
            value={draftQuery}
            allowClear
            placeholder="Search"
            onChange={(event) => setDraftQuery(event.target.value)}
            onClear={() => setDraftQuery("")}
          />

          <Select
            value={draftField}
            onValueChange={(value) =>
              setDraftField(value as SearchFieldOption)
            }
          >
            <SelectTrigger className="h-11 w-full rounded-md border-grey-50 bg-white text-base text-grey-100 shadow-none data-[placeholder]:text-grey-70">
              <SelectValue placeholder="All Fields" />
            </SelectTrigger>
            <SelectContent align="start" className="rounded-md border-grey-30">
              {SEARCH_FIELD_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={draftSource}
            onValueChange={(value) =>
              setDraftSource(value as CatalogSourceOption)
            }
          >
            <SelectTrigger className="h-11 w-full rounded-md border-grey-50 bg-white text-base text-grey-100 shadow-none data-[placeholder]:text-grey-70">
              <SelectValue placeholder="Select source" />
            </SelectTrigger>
            <SelectContent align="start" className="rounded-md border-grey-30">
              {CATALOG_SOURCE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            type="submit"
            variant="outline"
            className="h-11 rounded-md border-blue-20 bg-blue-10 px-5 text-primary hover:bg-blue-20"
          >
            Search
          </Button>
        </form>

        <DataTable
          className="mt-5 overflow-hidden rounded-md border border-grey-30"
          columns={columns}
          data={displayedRecords}
          emptyMessage="No data."
        />

        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-base text-grey-90">
            <span>Showing</span>
            <Select
              value={String(pageSize)}
              onValueChange={(value) => {
                setPageSize(Number(value));
                setSelectedIds((current) =>
                  current.filter((id) =>
                    displayedRecords
                      .slice(0, Number(value))
                      .some((record) => record.id === id),
                  ),
                );
              }}
            >
              <SelectTrigger className="h-10 min-w-20 rounded-md border-grey-50 bg-white text-grey-100 shadow-none">
                <SelectValue placeholder={String(pageSize)} />
              </SelectTrigger>
              <SelectContent align="start" className="rounded-md border-grey-30">
                {PAGE_SIZE_OPTIONS.map((option) => (
                  <SelectItem key={option} value={String(option)}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <p className="text-base text-grey-90">
            {totalResults === 0 ? "0 of 0" : `${from} - ${to} of ${totalResults}`}
          </p>
        </div>
      </MdUpwardCard>

      {selectedCount > 0 ? (
        <CopyCatalogingSelectionBar
          sidebarOpen={sidebarOpen}
          onSaveSelected={handleSaveSelected}
        />
      ) : null}
    </PageContainer>
  );
}
