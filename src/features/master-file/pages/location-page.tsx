"use client";

import { LocationDeleteModal } from "@/features/master-file/components/location-delete-modal";
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

type LocationStatus = "active" | "orphaned";

type LocationRecord = {
  id: string;
  code: string;
  name: string;
  status: LocationStatus;
  updatedAt: string;
};

type ToolbarProps = {
  search: string;
  activeFilter: LocationStatus;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onFilterChange: (value: LocationStatus) => void;
  onCreate: () => void;
};

type FooterProps = {
  pageSize: number;
  totalItems: number;
  displayedCount: number;
  onPageSizeChange: (value: number) => void;
};

const PAGE_SIZE_OPTIONS = [10, 20, 50];
const LOCATION_RECORDS: LocationRecord[] = [
  {
    id: "location-1",
    code: "SL",
    name: "My Library",
    status: "active",
    updatedAt: "28 Feb 2026",
  },
  {
    id: "location-2",
    code: "ORP",
    name: "Orphaned Location",
    status: "orphaned",
    updatedAt: "15 Mar 2026",
  },
];

function LocationToolbar({
  search,
  activeFilter,
  onSearchChange,
  onClearSearch,
  onFilterChange,
  onCreate,
}: ToolbarProps) {
  return (
    <div className="mb-5 space-y-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-base text-grey-100">Filter:</span>

        {([
          { value: "active", label: "Active" },
          { value: "orphaned", label: "Orphaned" },
        ] as const).map((filter) => (
          <Button
            key={filter.value}
            type="button"
            variant="outline"
            className={cn(
              "h-10 rounded-full border-grey-40 bg-white px-4 text-base font-normal text-grey-100 shadow-none hover:bg-grey-10",
              activeFilter === filter.value &&
                "border-blue-20 bg-blue-10 font-medium text-primary hover:bg-blue-10",
            )}
            onClick={() => onFilterChange(filter.value)}
          >
            {filter.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

function LocationFooter({
  pageSize,
  totalItems,
  displayedCount,
  onPageSizeChange,
}: FooterProps) {
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

      <p className="text-base text-grey-90">
        {totalItems === 0 ? "0 dari 0" : `${displayedCount} dari ${totalItems}`}
      </p>
    </div>
  );
}

export default function LocationPage() {
  const navigate = useNavigate();
  const [records, setRecords] = useState(LOCATION_RECORDS);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<LocationStatus>("active");
  const [pageSize, setPageSize] = useState(10);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteRecord, setDeleteRecord] = useState<LocationRecord | null>(null);

  const deferredSearch = useDeferredValue(search);
  const normalizedSearch = deferredSearch.trim().toLowerCase();
  const isFiltering = search !== deferredSearch;

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      if (record.status !== activeFilter) return false;
      if (!normalizedSearch) return true;

      return [record.code, record.name, record.updatedAt].some((value) =>
        value.toLowerCase().includes(normalizedSearch),
      );
    });
  }, [activeFilter, normalizedSearch, records]);

  const displayedRecords = useMemo(
    () => filteredRecords.slice(0, pageSize),
    [filteredRecords, pageSize],
  );
  const currentPageIds = useMemo(
    () => displayedRecords.map((record) => record.id),
    [displayedRecords],
  );
  const selectedIdSet = useMemo(() => new Set(selectedIds), [selectedIds]);
  const allCurrentPageSelected =
    currentPageIds.length > 0 &&
    currentPageIds.every((id) => selectedIdSet.has(id));
  const someCurrentPageSelected =
    currentPageIds.some((id) => selectedIdSet.has(id)) &&
    !allCurrentPageSelected;

  const handleConfirmDelete = () => {
    if (!deleteRecord) return;

    const { id } = deleteRecord;
    setRecords((current) => current.filter((record) => record.id !== id));
    setSelectedIds((current) => current.filter((selectedId) => selectedId !== id));
    setDeleteRecord(null);
  };

  const columns = useMemo<ColumnDef<LocationRecord>[]>(
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
            ariaLabel="Select all location rows on current page"
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
        accessorKey: "code",
        meta: {
          headClassName: "w-[180px]",
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
          headClassName: "min-w-[240px]",
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
          headClassName: "w-[220px]",
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
        cell: ({ row }) => (
          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Edit ${row.original.name}`}
              className="text-blue-60 hover:bg-blue-10 hover:text-blue-50"
              onClick={(event) => {
                event.stopPropagation();
                navigate(
                  `/master-file/authority-files/location/edit/${row.original.id}`,
                );
              }}
            >
              <Pencil className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Delete ${row.original.name}`}
              className="text-red-50 hover:bg-red-10 hover:text-red-60"
              onClick={(event) => {
                event.stopPropagation();
                setDeleteRecord(row.original);
              }}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ),
      },
    ],
    [
      allCurrentPageSelected,
      currentPageIds,
      selectedIdSet,
      someCurrentPageSelected,
      navigate,
    ],
  );

  return (
    <PageContainer className="pb-10">
      <AppPageHeader title="Location" />

      <MdUpwardCard className="mt-5">
        <LocationToolbar
          search={search}
          activeFilter={activeFilter}
          onCreate={() => navigate("/master-file/authority-files/location/create")}
          onSearchChange={(value) => {
            setSearch(value);
            setSelectedIds([]);
          }}
          onClearSearch={() => {
            setSearch("");
            setSelectedIds([]);
          }}
          onFilterChange={(value) => {
            setActiveFilter(value);
            setSelectedIds([]);
          }}
        />

        <Spinner visible={isFiltering}>
          <DataTable
            className="overflow-hidden rounded-md border border-grey-30"
            columns={columns}
            data={displayedRecords}
            emptyMessage="No data."
            onRowClick={(record) =>
              navigate(`/master-file/authority-files/location/detail/${record.id}`)
            }
          />
        </Spinner>

        <LocationFooter
          pageSize={pageSize}
          totalItems={filteredRecords.length}
          displayedCount={displayedRecords.length}
          onPageSizeChange={(value) => {
            setPageSize(value);
            setSelectedIds([]);
          }}
        />
      </MdUpwardCard>

      <LocationDeleteModal
        open={deleteRecord !== null}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteRecord(null);
          }
        }}
        onDelete={handleConfirmDelete}
      />
    </PageContainer>
  );
}
