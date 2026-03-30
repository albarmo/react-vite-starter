"use client";

import { useUiStore } from "@/app/store/ui.store";
import { SupplierDeleteModal } from "@/features/protected/library/master-file/authority-files/components/supplier-delete-modal";
import type {
  SupplierDeleteTarget as DeleteTarget,
  SupplierFooterProps,
  SupplierRecord,
  SupplierSelectionBarProps,
} from "@/features/protected/library/master-file/authority-files/types/supplier.types";
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
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE_OPTIONS = [10, 20, 50];
const SUPPLIER_RECORDS: SupplierRecord[] = [
  {
    id: "supplier-1",
    name: "\\'Gramedia",
    address: "\\'Gramedia",
    contact: "\\'Gramedia",
    phoneNumber: "\\'Gramedia",
    faxNumber: "\\'Gramedia",
    accountNumber: "\\'Gramedia",
    updatedAt: "28 Feb 2026",
  },
];

function SupplierFooter({ pageSize, onPageSizeChange }: SupplierFooterProps) {
  return (
    <div className="mt-6 flex items-center justify-between gap-4">
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

      <p className="text-base text-grey-90">0 of 0</p>
    </div>
  );
}

function SupplierSelectionBar({
  sidebarOpen,
  onDeleteSelected,
}: SupplierSelectionBarProps) {
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

export function SupplierPage() {
  const navigate = useNavigate();
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);
  const [records, setRecords] = useState(SUPPLIER_RECORDS);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

  const deferredSearch = useDeferredValue(search);
  const normalizedSearch = deferredSearch.trim().toLowerCase();
  const isFiltering = search !== deferredSearch;

  const filteredRecords = useMemo(() => {
    if (!normalizedSearch) return records;

    return records.filter((record) =>
      [
        record.name,
        record.address,
        record.contact,
        record.phoneNumber,
        record.faxNumber,
        record.accountNumber,
        record.updatedAt,
      ].some((value) => value.toLowerCase().includes(normalizedSearch)),
    );
  }, [normalizedSearch, records]);

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

  const handleOpenDeleteSelected = () => {
    if (selectedCount === 0) return;

    setDeleteTarget({
      type: "selected",
      ids: selectedIds,
    });
  };

  const columns = useMemo<ColumnDef<SupplierRecord>[]>(
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
          <span className="text-base text-grey-90">{row.index + 1}.</span>
        ),
      },
      {
        accessorKey: "name",
        meta: {
          headClassName: "w-[170px]",
          cellClassName: "px-3 py-4",
        },
        header: "Name",
        cell: ({ row }) => (
          <span className="text-base text-grey-90">{row.original.name}</span>
        ),
      },
      {
        accessorKey: "address",
        meta: {
          headClassName: "w-[170px]",
          cellClassName: "px-3 py-4",
        },
        header: "Address",
        cell: ({ row }) => (
          <span className="text-base text-grey-90">{row.original.address}</span>
        ),
      },
      {
        accessorKey: "contact",
        meta: {
          headClassName: "w-[140px]",
          cellClassName: "px-3 py-4",
        },
        header: "Contact",
        cell: ({ row }) => (
          <span className="text-base text-grey-90">{row.original.contact}</span>
        ),
      },
      {
        accessorKey: "phoneNumber",
        meta: {
          headClassName: "w-[170px]",
          cellClassName: "px-3 py-4",
        },
        header: "Phone Number",
        cell: ({ row }) => (
          <span className="text-base text-grey-90">
            {row.original.phoneNumber}
          </span>
        ),
      },
      {
        accessorKey: "faxNumber",
        meta: {
          headClassName: "w-[150px]",
          cellClassName: "px-3 py-4",
        },
        header: "Fax Number",
        cell: ({ row }) => (
          <span className="text-base text-grey-90">
            {row.original.faxNumber}
          </span>
        ),
      },
      {
        accessorKey: "accountNumber",
        meta: {
          headClassName: "w-[180px]",
          cellClassName: "px-3 py-4",
        },
        header: "Account Number",
        cell: ({ row }) => (
          <span className="text-base text-grey-90">
            {row.original.accountNumber}
          </span>
        ),
      },
      {
        accessorKey: "updatedAt",
        meta: {
          headClassName: "w-[150px]",
          cellClassName: "px-3 py-4",
        },
        header: "Last Updated",
        cell: ({ row }) => (
          <span className="text-base text-grey-90">
            {row.original.updatedAt}
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
                    `/master-file/authority-files/supplier/edit/${row.original.id}`,
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
      selectedIdSet,
      someCurrentPageSelected,
    ],
  );

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

  return (
    <PageContainer
      className={cn(selectedCount > 0 ? "pb-32 md:pb-36" : "pb-10")}
    >
      <AppPageHeader title="Supplier" />

      <MdUpwardCard className="mt-5">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full lg:max-w-[300px]">
            <SearchInput
              value={search}
              placeholder="Search"
              allowClear
              onChange={(event) => {
                setSearch(event.target.value);
                setSelectedIds([]);
              }}
              onClear={() => {
                setSearch("");
                setSelectedIds([]);
              }}
            />
          </div>

          <Button
            type="button"
            className="h-11 self-start px-5 lg:self-auto"
            onClick={() =>
              navigate("/master-file/authority-files/supplier/create")
            }
          >
            <Plus className="size-4" />
            Create
          </Button>
        </div>

        <Spinner visible={isFiltering}>
          <DataTable
            className="overflow-hidden rounded-md border border-grey-30"
            columns={columns}
            data={displayedRecords}
            emptyMessage="No data."
            onRowClick={(record) =>
              navigate(
                `/master-file/authority-files/supplier/detail/${record.id}`,
              )
            }
          />
        </Spinner>

        <SupplierFooter
          pageSize={pageSize}
          onPageSizeChange={(value) => {
            setPageSize(value);
            setSelectedIds([]);
          }}
        />
      </MdUpwardCard>

      {selectedCount > 0 ? (
        <SupplierSelectionBar
          sidebarOpen={sidebarOpen}
          onDeleteSelected={handleOpenDeleteSelected}
        />
      ) : null}

      <SupplierDeleteModal
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
          }
        }}
        onDelete={handleConfirmDelete}
        description={
          deleteTarget?.type === "selected"
            ? "Are you sure you want to delete selected Suppliers?"
            : "Are you sure you want to delete this Supplier?"
        }
      />
    </PageContainer>
  );
}
