"use client";

import { useUiStore } from "@/app/store/ui.store";
import { ContentTypeDeleteModal } from "@/features/master-file/components/content-type-delete-modal";
import { PageContainer } from "@/shared/components/common/app-page-container";
import { AppPageHeader } from "@/shared/components/common/app-page-header";
import { DataTable } from "@/shared/components/common/data-table";
import { MdUpwardCard } from "@/shared/components/common/md-upward-card";
import { SearchInput } from "@/shared/components/common/search-input";
import { SelectionCheckbox } from "@/shared/components/common/selection-checkbox";
import { Spinner } from "@/shared/components/common/spinner";
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
import {
  ChevronLeft,
  ChevronRight,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type ContentTypeRecord = {
  id: string;
  code: string;
  name: string;
  updatedAt: string;
};

type DeleteTarget =
  | {
      type: "single";
      record: ContentTypeRecord;
    }
  | {
      type: "selected";
      ids: string[];
    };

type ToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onCreate: () => void;
};

type FooterProps = {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  from: number;
  to: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  onPageSizeChange: (value: number) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
};

type SelectionBarProps = {
  sidebarOpen: boolean;
  onDeleteSelected: () => void;
};

const PAGE_SIZE_OPTIONS = [10, 20, 50];
const CONTENT_TYPE_BASE_RECORDS: Omit<ContentTypeRecord, "id">[] = [
  {
    code: "crd",
    name: "cartographic dataset",
    updatedAt: "28 Feb 2026",
  },
  {
    code: "cri",
    name: "cartographic image",
    updatedAt: "15 Mar 2026",
  },
  {
    code: "crm",
    name: "cartographic moving image",
    updatedAt: "31 Mar 2026",
  },
  {
    code: "crt",
    name: "cartographic tactile image",
    updatedAt: "10 Apr 2026",
  },
  {
    code: "crn",
    name: "cartographic tactile three-dimensional form",
    updatedAt: "30 Apr 2026",
  },
  {
    code: "crf",
    name: "cartographic three-dimensional form",
    updatedAt: "20 Mei 2026",
  },
  {
    code: "cod",
    name: "computer dataset",
    updatedAt: "31 Mei 2026",
  },
  {
    code: "cop",
    name: "computer program",
    updatedAt: "12 Jun 2026",
  },
  {
    code: "ntv",
    name: "notated movement",
    updatedAt: "30 Jun 2026",
  },
  {
    code: "ntm",
    name: "notated music",
    updatedAt: "17 Jul 2026",
  },
];
const CONTENT_TYPE_RECORDS: ContentTypeRecord[] = Array.from(
  { length: 1000 },
  (_, index) => {
    const base = CONTENT_TYPE_BASE_RECORDS[index % CONTENT_TYPE_BASE_RECORDS.length];

    return {
      id: `content-type-${index + 1}`,
      code:
        index < CONTENT_TYPE_BASE_RECORDS.length
          ? base.code
          : `${base.code}-${index + 1}`,
      name: base.name,
      updatedAt: base.updatedAt,
    };
  },
);

function ContentTypeToolbar({
  search,
  onSearchChange,
  onClearSearch,
  onCreate,
}: ToolbarProps) {
  return (
    <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="w-full lg:max-w-[300px]">
        <SearchInput
          value={search}
          placeholder="Search"
          allowClear
          onChange={(event) => onSearchChange(event.target.value)}
          onClear={onClearSearch}
        />
      </div>

      <Button
        type="button"
        className="h-11 px-5 self-start lg:self-auto"
        onClick={onCreate}
      >
        <Plus className="size-4" />
        Create
      </Button>
    </div>
  );
}

function ContentTypeFooter({
  currentPage,
  pageSize,
  totalItems,
  from,
  to,
  canPreviousPage,
  canNextPage,
  onPageSizeChange,
  onPreviousPage,
  onNextPage,
}: FooterProps) {
  return (
    <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3 text-base text-grey-90">
        <span>Showing</span>
        <Select
          value={String(pageSize)}
          onValueChange={(value) => onPageSizeChange(Number(value))}
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

      <div className="flex items-center justify-between gap-4 lg:justify-end">
        <p className="text-base text-grey-90">
          {totalItems === 0 ? "0 of 0" : `${from} - ${to} of ${totalItems}`}
        </p>

        {totalItems > 0 ? (
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={onPreviousPage}
              disabled={!canPreviousPage}
              aria-label={`Go to page ${currentPage - 1}`}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={onNextPage}
              disabled={!canNextPage}
              aria-label={`Go to page ${currentPage + 1}`}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ContentTypeSelectionBar({
  sidebarOpen,
  onDeleteSelected,
}: SelectionBarProps) {
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-grey-30 bg-white/95 shadow-[0_-18px_48px_rgba(15,23,42,0.08)] backdrop-blur",
        sidebarOpen ? "md:left-68" : "md:left-20",
      )}
    >
      <div className="mx-auto flex w-full max-w-310 items-center justify-end px-3 py-4 sm:px-4 md:px-8">
        <Button
          type="button"
          size="lg"
          variant="destructive"
          onClick={onDeleteSelected}
        >
          <Trash2 className="size-4" />
          Delete
        </Button>
      </div>
    </div>
  );
}

export default function ContentTypePage() {
  const navigate = useNavigate();
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);
  const [records, setRecords] = useState(CONTENT_TYPE_RECORDS);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const deferredSearch = useDeferredValue(search);
  const normalizedSearch = deferredSearch.trim().toLowerCase();
  const isFiltering = search !== deferredSearch;

  const filteredRecords = useMemo(() => {
    if (!normalizedSearch) return records;

    return records.filter((record) =>
      [record.code, record.name, record.updatedAt].some((value) =>
        value.toLowerCase().includes(normalizedSearch),
      ),
    );
  }, [records, normalizedSearch]);

  const totalItems = filteredRecords.length;
  const lastPage = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, lastPage);
  const offset = (safeCurrentPage - 1) * pageSize;

  const pageRecords = useMemo(
    () => filteredRecords.slice(offset, offset + pageSize),
    [filteredRecords, offset, pageSize],
  );

  const currentPageIds = useMemo(
    () => pageRecords.map((record) => record.id),
    [pageRecords],
  );
  const selectedIdSet = useMemo(() => new Set(selectedIds), [selectedIds]);
  const selectedCount = selectedIds.length;
  const allCurrentPageSelected =
    currentPageIds.length > 0 &&
    currentPageIds.every((id) => selectedIdSet.has(id));
  const someCurrentPageSelected =
    currentPageIds.some((id) => selectedIdSet.has(id)) &&
    !allCurrentPageSelected;

  const handleOpenDeleteSelected = () => {
    if (selectedCount === 0) return;

    setDeleteTarget({
      type: "selected",
      ids: selectedIds,
    });
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    if (deleteTarget.type === "single") {
      const { id } = deleteTarget.record;
      setRecords((current) => current.filter((record) => record.id !== id));
      setSelectedIds((current) =>
        current.filter((selectedId) => selectedId !== id),
      );
      setDeleteTarget(null);
      return;
    }

    const deleteIdSet = new Set(deleteTarget.ids);
    setRecords((current) =>
      current.filter((record) => !deleteIdSet.has(record.id)),
    );
    setSelectedIds([]);
    setDeleteTarget(null);
  };

  const columns = useMemo<ColumnDef<ContentTypeRecord>[]>(
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
          <div onClick={(event) => event.stopPropagation()}>
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
              ariaLabel={`Select ${row.original.name}`}
            />
          </div>
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
          <span className="text-base text-grey-90">
            {offset + row.index + 1}.
          </span>
        ),
      },
      {
        accessorKey: "code",
        meta: {
          headClassName: "w-[160px]",
          cellClassName: "px-3 py-4",
        },
        header: "Code",
        cell: ({ row }) => (
          <span className="text-base text-grey-90">{row.original.code}</span>
        ),
      },
      {
        accessorKey: "name",
        meta: {
          headClassName: "min-w-[320px]",
          cellClassName: "px-3 py-4",
        },
        header: "Name",
        cell: ({ row }) => (
          <span className="text-base text-grey-90">{row.original.name}</span>
        ),
      },
      {
        accessorKey: "updatedAt",
        meta: {
          headClassName: "w-[180px]",
          cellClassName: "px-3 py-4",
        },
        header: "Last Updated",
        cell: ({ row }) => (
          <span className="text-base text-grey-90">{row.original.updatedAt}</span>
        ),
      },
      {
        id: "actions",
        meta: {
          headClassName: "w-[110px] text-right",
          cellClassName: "px-3 py-4 text-right",
        },
        header: () => <div className="text-right">Action</div>,
        cell: ({ row }) => {
          const isSelected = selectedIdSet.has(row.original.id);

          return (
            <div className="flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                disabled={isSelected}
                aria-label={`Edit ${row.original.name}`}
                className={cn(
                  "text-blue-60 hover:bg-blue-10 hover:text-blue-50",
                  isSelected && "text-grey-60 hover:bg-transparent",
                )}
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(
                    `/master-file/authority-files/content-type/edit/${row.original.id}`,
                  );
                }}
              >
                <Pencil className="size-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                disabled={isSelected}
                aria-label={`Delete ${row.original.name}`}
                className={cn(
                  "text-red-50 hover:bg-red-10 hover:text-red-60",
                  isSelected && "text-grey-60 hover:bg-transparent",
                )}
                onClick={(event) => {
                  event.stopPropagation();
                  setDeleteTarget({
                    type: "single",
                    record: row.original,
                  });
                }}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          );
        },
      },
    ],
    [
      allCurrentPageSelected,
      currentPageIds,
      navigate,
      offset,
      selectedIdSet,
      someCurrentPageSelected,
    ],
  );

  const from = totalItems === 0 ? 0 : offset + 1;
  const to = totalItems === 0 ? 0 : offset + pageRecords.length;

  return (
    <PageContainer
      className={cn(selectedCount > 0 ? "pb-32 md:pb-36" : "pb-10")}
    >
      <AppPageHeader title="Content Type" />

      <MdUpwardCard className="mt-5">
        <ContentTypeToolbar
          search={search}
          onSearchChange={(value) => {
            setSearch(value);
            setCurrentPage(1);
          }}
          onClearSearch={() => {
            setSearch("");
            setCurrentPage(1);
          }}
          onCreate={() => navigate("/master-file/authority-files/content-type/create")}
        />

        <Spinner visible={isFiltering}>
          <DataTable
            className="overflow-hidden rounded-md border border-grey-30"
            columns={columns}
            data={pageRecords}
            emptyMessage="No data."
            onRowClick={(record) =>
              navigate(
                `/master-file/authority-files/content-type/detail/${record.id}`,
              )
            }
          />
        </Spinner>

        <ContentTypeFooter
          currentPage={safeCurrentPage}
          pageSize={pageSize}
          totalItems={totalItems}
          from={from}
          to={to}
          canPreviousPage={safeCurrentPage > 1}
          canNextPage={safeCurrentPage < lastPage}
          onPageSizeChange={(value) => {
            setPageSize(value);
            setCurrentPage(1);
          }}
          onPreviousPage={() =>
            setCurrentPage((page) => Math.max(1, page - 1))
          }
          onNextPage={() =>
            setCurrentPage((page) => Math.min(lastPage, page + 1))
          }
        />
      </MdUpwardCard>

      {selectedCount > 0 ? (
        <ContentTypeSelectionBar
          sidebarOpen={sidebarOpen}
          onDeleteSelected={handleOpenDeleteSelected}
        />
      ) : null}

      <ContentTypeDeleteModal
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
          }
        }}
        onDelete={handleConfirmDelete}
        description={
          deleteTarget?.type === "selected"
            ? "Are you sure you want to delete selected Content Types?"
            : "Are you sure you want to delete this Content Type?"
        }
      />
    </PageContainer>
  );
}
