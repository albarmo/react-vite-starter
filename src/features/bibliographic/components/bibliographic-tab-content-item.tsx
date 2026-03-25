"use client";

import { BibliographicExportModal } from "@/features/bibliographic/components/bibliographic-export-modal";
import { BibliographicImportModal } from "@/features/bibliographic/components/bibliographic-import-modal";
import { DataTable } from "@/shared/components/common/data-table";
import { SearchInput } from "@/shared/components/common/search-input";
import { SelectionCheckbox } from "@/shared/components/common/selection-checkbox";
import { Spinner } from "@/shared/components/common/spinner";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { type ColumnDef } from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  EllipsisVertical,
  Eye,
  Pencil,
  Printer,
  Upload,
} from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { Link } from "react-router-dom";

type BibliographicItem = {
  id: string;
  bookId: string;
  itemCode: string;
  title: string;
  author: string;
  collectionType: string;
  location: string;
  callNumber: string;
  updatedAt: string;
};

type ItemToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onOpenExportModal: () => void;
  onOpenImportModal: () => void;
};

type ItemFooterProps = {
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

const PAGE_SIZE_OPTIONS = [10, 20, 50];
const ITEM_PAGE_SAMPLE_CODES = [
  "P00020S",
  "P00012S",
  "P00013S",
  "P00014S",
  "P00015S",
  "P00016S",
  "P00017S",
  "P00018S",
  "P00019S",
  "P00011S",
];
const ITEM_UPDATED_AT_OPTIONS = [
  "28 Feb 2026",
  "15 Mar 2026",
  "31 Mar 2026",
  "10 Apr 2026",
  "30 Apr 2026",
  "20 Mei 2026",
  "31 Mei 2026",
  "12 Jun 2026",
  "30 Jun 2026",
  "17 Jul 2026",
];
const BIBLIOGRAPHIC_ITEMS: BibliographicItem[] = Array.from(
  { length: 1000 },
  (_, index) => ({
    id: `item-${index + 1}`,
    bookId: "book-10",
    itemCode:
      ITEM_PAGE_SAMPLE_CODES[index] ??
      `P${String(index + 21).padStart(5, "0")}S`,
    title: "The Let Them Theory",
    author: "Mel Robbins",
    collectionType: "Textbook",
    location: "My Library",
    callNumber: "-",
    updatedAt: ITEM_UPDATED_AT_OPTIONS[index % ITEM_UPDATED_AT_OPTIONS.length],
  }),
);

function ItemToolbar({
  search,
  onSearchChange,
  onClearSearch,
  onOpenExportModal,
  onOpenImportModal,
}: ItemToolbarProps) {
  return (
    <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="w-full lg:max-w-[320px]">
        <SearchInput
          value={search}
          placeholder="Search"
          allowClear
          onChange={(event) => onSearchChange(event.target.value)}
          onClear={onClearSearch}
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="outline">
            Action
            <ChevronDown className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-52 rounded-md border-grey-30"
        >
          <DropdownMenuItem onSelect={onOpenExportModal}>
            <Download className="size-4 text-blue-50" />
            Export
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={onOpenImportModal}>
            <Upload className="size-4 text-grey-90" />
            Import
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ItemFooter({
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
}: ItemFooterProps) {
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
          <SelectContent align="start">
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
          {from} - {to} of {totalItems}
        </p>

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
      </div>
    </div>
  );
}

export function BibliographicTabContentItem() {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const deferredSearch = useDeferredValue(search);
  const normalizedSearch = deferredSearch.trim().toLowerCase();
  const isFiltering = search !== deferredSearch;

  const filteredItems = useMemo(() => {
    if (!normalizedSearch) return BIBLIOGRAPHIC_ITEMS;

    return BIBLIOGRAPHIC_ITEMS.filter((item) =>
      [
        item.itemCode,
        item.title,
        item.author,
        item.collectionType,
        item.location,
        item.callNumber,
      ].some((value) => value.toLowerCase().includes(normalizedSearch)),
    );
  }, [normalizedSearch]);

  const totalItems = filteredItems.length;
  const lastPage = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, lastPage);
  const offset = (safeCurrentPage - 1) * pageSize;

  const pageItems = useMemo(
    () => filteredItems.slice(offset, offset + pageSize),
    [filteredItems, offset, pageSize],
  );

  const currentPageIds = useMemo(
    () => pageItems.map((item) => item.id),
    [pageItems],
  );
  const selectedIdSet = useMemo(() => new Set(selectedIds), [selectedIds]);
  const allCurrentPageSelected =
    currentPageIds.length > 0 &&
    currentPageIds.every((id) => selectedIdSet.has(id));
  const someCurrentPageSelected =
    currentPageIds.some((id) => selectedIdSet.has(id)) &&
    !allCurrentPageSelected;

  const columns = useMemo<ColumnDef<BibliographicItem>[]>(
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
            ariaLabel="Select all item rows on current page"
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
            ariaLabel={`Select ${row.original.itemCode}`}
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
          <span className="text-base text-grey-90">
            {offset + row.index + 1}.
          </span>
        ),
      },
      {
        accessorKey: "itemCode",
        meta: {
          headClassName: "w-[140px]",
          cellClassName: "px-3 py-4",
        },
        header: "Item Code",
        cell: ({ row }) => (
          <span className="text-base text-grey-90">{row.original.itemCode}</span>
        ),
      },
      {
        accessorKey: "title",
        meta: {
          headClassName: "min-w-[360px]",
          cellClassName: "px-3 py-4",
        },
        header: "Title",
        cell: ({ row }) => {
          const item = row.original;

          return (
            <Link
              to={`/bibliographic/item/detail/${item.id}`}
              className="group block min-w-[320px]"
            >
              <p className="truncate text-base font-medium text-grey-100 transition-colors group-hover:text-primary">
                {item.title}
              </p>
              <p className="mt-1 truncate text-sm text-grey-70">
                {item.author}
              </p>
            </Link>
          );
        },
      },
      {
        accessorKey: "collectionType",
        meta: {
          headClassName: "w-[160px]",
          cellClassName: "px-3 py-4",
        },
        header: "Collection Type",
        cell: ({ row }) => (
          <span className="text-base text-grey-90">
            {row.original.collectionType}
          </span>
        ),
      },
      {
        accessorKey: "location",
        meta: {
          headClassName: "w-[140px]",
          cellClassName: "px-3 py-4",
        },
        header: "Location",
        cell: ({ row }) => (
          <span className="text-base text-grey-90">{row.original.location}</span>
        ),
      },
      {
        accessorKey: "callNumber",
        meta: {
          headClassName: "w-[120px]",
          cellClassName: "px-3 py-4",
        },
        header: "Call Number",
        cell: ({ row }) => (
          <span className="text-base text-grey-90">
            {row.original.callNumber}
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
          <span className="text-base text-grey-90">{row.original.updatedAt}</span>
        ),
      },
      {
        id: "actions",
        meta: {
          headClassName: "w-14 text-right",
          cellClassName: "px-3 py-4 text-right",
        },
        header: () => <span className="sr-only">Action</span>,
        cell: ({ row }) => {
          const item = row.original;

          return (
            <div className="flex items-center justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Open actions for ${item.itemCode}`}
                  >
                    <EllipsisVertical className="size-4 text-blue-50" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-48 rounded-md border-grey-30"
                >
                  <DropdownMenuItem asChild>
                    <Link to={`/bibliographic/item/detail/${item.id}`}>
                      <Eye className="size-4" />
                      Detail
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={`/bibliographic/item/edit/${item.id}`}>
                      <Pencil className="size-4" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => {}}>
                    <Printer className="size-4" />
                    Print Catalog
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    [
      allCurrentPageSelected,
      currentPageIds,
      offset,
      selectedIdSet,
      someCurrentPageSelected,
    ],
  );

  const from = totalItems === 0 ? 0 : offset + 1;
  const to = totalItems === 0 ? 0 : offset + pageItems.length;

  return (
    <>
      <ItemToolbar
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setCurrentPage(1);
        }}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onOpenImportModal={() => setIsImportModalOpen(true)}
        onClearSearch={() => {
          setSearch("");
          setCurrentPage(1);
        }}
      />

      <Spinner visible={isFiltering}>
        <DataTable
          columns={columns}
          data={pageItems}
          emptyMessage="No item data found."
        />
      </Spinner>

      <ItemFooter
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
        onPreviousPage={() => setCurrentPage((page) => Math.max(1, page - 1))}
        onNextPage={() =>
          setCurrentPage((page) => Math.min(lastPage, page + 1))
        }
      />

      <BibliographicExportModal
        open={isExportModalOpen}
        onOpenChange={setIsExportModalOpen}
      />
      <BibliographicImportModal
        open={isImportModalOpen}
        onOpenChange={setIsImportModalOpen}
      />
    </>
  );
}
