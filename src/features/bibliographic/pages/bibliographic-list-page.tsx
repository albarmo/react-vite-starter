"use client";

import { PageContainer } from "@/shared/components/common/app-page-container";
import { AppPageHeader } from "@/shared/components/common/app-page-header";
import { DataTable } from "@/shared/components/common/data-table";
import { MdUpwardCard } from "@/shared/components/common/md-upward-card";
import { SearchInput } from "@/shared/components/common/search-input";
import { SelectionCheckbox } from "@/shared/components/common/selection-checkbox";
import { Spinner } from "@/shared/components/common/spinner";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import type { CSSProperties } from "react";
import { useDeferredValue, useMemo, useState } from "react";

type BibliographicBook = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  copies: number;
  updatedAt: string;
  coverTitle: string;
  coverAccent: string;
  coverStyle: CSSProperties;
};

type BibliographicToolbarProps = {
  search: string;
  selectedCount: number;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
};

type BibliographicFooterProps = {
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
const COVER_STYLES: CSSProperties[] = [
  { background: "linear-gradient(180deg, #122033 0%, #1a8a84 100%)", color: "#ffffff" },
  { background: "linear-gradient(180deg, #3a244f 0%, #a884ff 100%)", color: "#fff7c2" },
  { background: "linear-gradient(180deg, #f0e6d7 0%, #f8f3eb 100%)", color: "#243447" },
  { background: "linear-gradient(180deg, #d8f0c9 0%, #f4fae8 100%)", color: "#22412f" },
  { background: "linear-gradient(180deg, #c1e9f5 0%, #fde8b7 100%)", color: "#24425a" },
  { background: "linear-gradient(180deg, #1d1a1a 0%, #564742 100%)", color: "#f6f0df" },
  { background: "linear-gradient(180deg, #2b6ea6 0%, #f2c94c 100%)", color: "#ffffff" },
  { background: "linear-gradient(180deg, #7143a8 0%, #d3b5ff 100%)", color: "#ffffff" },
  { background: "linear-gradient(180deg, #ffffff 0%, #fff4f4 100%)", color: "#d92d20" },
  { background: "linear-gradient(180deg, #17b66d 0%, #d7ffbb 100%)", color: "#ffffff" },
];
const BIBLIOGRAPHIC_BOOKS: BibliographicBook[] = [
  {
    id: "book-1",
    title: "Bacalah Saat Hatimu Sedih",
    author: "Ahmad Rifai Rifan",
    isbn: "9786230022104",
    copies: 2,
    updatedAt: "28 Feb 2026",
    coverTitle: "Sedih",
    coverAccent: "Bacalah",
    coverStyle: COVER_STYLES[0],
  },
  {
    id: "book-2",
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    isbn: "9786020333175",
    copies: 1,
    updatedAt: "15 Mar 2026",
    coverTitle: "RICH DAD",
    coverAccent: "POOR DAD",
    coverStyle: COVER_STYLES[1],
  },
  {
    id: "book-3",
    title: "Perintis Fantastis Bukan Pewaris",
    author: "Byzka Wibisono",
    isbn: "9786342530160",
    copies: 10,
    updatedAt: "31 Mar 2026",
    coverTitle: "Perintis",
    coverAccent: "Fantastis",
    coverStyle: COVER_STYLES[2],
  },
  {
    id: "book-4",
    title: "The Art of Spending Money",
    author: "Morgan Housel",
    isbn: "9786238371563",
    copies: 4,
    updatedAt: "10 Apr 2026",
    coverTitle: "Spending",
    coverAccent: "Money",
    coverStyle: COVER_STYLES[3],
  },
  {
    id: "book-5",
    title: "Untukmu yang Mau Mengelola Uang, tapi Takut Memulainya",
    author: "Bbyeonggeul",
    isbn: "9786020531885",
    copies: 3,
    updatedAt: "30 Apr 2026",
    coverTitle: "Kelola",
    coverAccent: "Uang",
    coverStyle: COVER_STYLES[4],
  },
  {
    id: "book-6",
    title: "The Principles of Money",
    author: "Andrew Carnegie",
    isbn: "9786235153667",
    copies: 2,
    updatedAt: "20 Mei 2026",
    coverTitle: "Money",
    coverAccent: "Principles",
    coverStyle: COVER_STYLES[5],
  },
  {
    id: "book-7",
    title: "Gaji UMR Bisa Kok Bertahan Hidup!",
    author: "Fajar Sidiq",
    isbn: "9786230072888",
    copies: 2,
    updatedAt: "31 Mei 2026",
    coverTitle: "GAJI",
    coverAccent: "UMR",
    coverStyle: COVER_STYLES[6],
  },
  {
    id: "book-8",
    title: "Why the Rich are Getting Richer (2025)",
    author: "Robert T. Kiyosaki",
    isbn: "9786020381077",
    copies: 5,
    updatedAt: "12 Jun 2026",
    coverTitle: "Getting",
    coverAccent: "Richer",
    coverStyle: COVER_STYLES[7],
  },
  {
    id: "book-9",
    title: "Start with Why (Dengan Materi yang Diperbarui)",
    author: "Simon Sinek",
    isbn: "9786020628837",
    copies: 10,
    updatedAt: "30 Jun 2026",
    coverTitle: "START",
    coverAccent: "WITH WHY",
    coverStyle: COVER_STYLES[8],
  },
  {
    id: "book-10",
    title: "The Let Them Theory",
    author: "Mel Robbins",
    isbn: "625221049",
    copies: 12,
    updatedAt: "17 Jul 2026",
    coverTitle: "LET",
    coverAccent: "THEM",
    coverStyle: COVER_STYLES[9],
  },
  {
    id: "book-11",
    title: "Atomic Habits",
    author: "James Clear",
    isbn: "9780735211292",
    copies: 8,
    updatedAt: "02 Agu 2026",
    coverTitle: "Atomic",
    coverAccent: "Habits",
    coverStyle: COVER_STYLES[0],
  },
  {
    id: "book-12",
    title: "Psychology of Money",
    author: "Morgan Housel",
    isbn: "9780857197689",
    copies: 6,
    updatedAt: "19 Agu 2026",
    coverTitle: "Psychology",
    coverAccent: "of Money",
    coverStyle: COVER_STYLES[1],
  },
  {
    id: "book-13",
    title: "Deep Work",
    author: "Cal Newport",
    isbn: "9781455586691",
    copies: 4,
    updatedAt: "04 Sep 2026",
    coverTitle: "Deep",
    coverAccent: "Work",
    coverStyle: COVER_STYLES[2],
  },
  {
    id: "book-14",
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    isbn: "9781451639612",
    copies: 7,
    updatedAt: "18 Sep 2026",
    coverTitle: "7",
    coverAccent: "Habits",
    coverStyle: COVER_STYLES[3],
  },
  {
    id: "book-15",
    title: "Essentialism",
    author: "Greg McKeown",
    isbn: "9780804137386",
    copies: 3,
    updatedAt: "02 Okt 2026",
    coverTitle: "Less",
    coverAccent: "but better",
    coverStyle: COVER_STYLES[4],
  },
];

function BookCover({
  accent,
  title,
  style,
}: {
  accent: string;
  title: string;
  style: CSSProperties;
}) {
  return (
    <div
      className="flex h-14 w-10 shrink-0 flex-col justify-between overflow-hidden rounded-xs px-1.5 py-1 shadow-sm"
      style={style}
    >
      <span className="text-[5px] line-clamp-4 font-medium uppercase opacity-80">
        {accent}
      </span>
      <span className="text-[4px] font-light uppercase leading-[1.05] tracking-[0.04em]">
        {title}
      </span>
    </div>
  );
}

function BibliographicToolbar({
  search,
  selectedCount,
  onSearchChange,
  onClearSearch,
}: BibliographicToolbarProps) {
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

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="outline"
            >
              Action
              <ChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuItem disabled={selectedCount === 0}>
              Export selected
            </DropdownMenuItem>
            <DropdownMenuItem disabled={selectedCount === 0}>
              Archive selected
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              disabled={selectedCount === 0}
              variant="destructive"
            >
              Delete selected
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          type="button"
        >
          <Plus className="size-4" />
          Create
        </Button>
      </div>
    </div>
  );
}

function BibliographicFooter({
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
}: BibliographicFooterProps) {
  return (
    <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3 text-sm text-grey-90">
        <span>Showing</span>
        <Select value={String(pageSize)} onValueChange={(value) => onPageSizeChange(Number(value))}>
          <SelectTrigger className="h-10 min-w-20 rounded-xl border-grey-50 bg-white text-grey-100 shadow-none">
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
        <p className="text-sm text-grey-90">
          {from} - {to} of {totalItems}
        </p>

        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={onPreviousPage}
            disabled={!canPreviousPage}
            className="text-grey-80 hover:bg-blue-10 hover:text-grey-100"
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
            className="text-grey-80 hover:bg-blue-10 hover:text-grey-100"
            aria-label={`Go to page ${currentPage + 1}`}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function BibliographicListPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const deferredSearch = useDeferredValue(search);
  const normalizedSearch = deferredSearch.trim().toLowerCase();
  const isFiltering = search !== deferredSearch;

  const filteredBooks = useMemo(() => {
    if (!normalizedSearch) return BIBLIOGRAPHIC_BOOKS;

    return BIBLIOGRAPHIC_BOOKS.filter((book) =>
      [book.title, book.author, book.isbn].some((value) =>
        value.toLowerCase().includes(normalizedSearch),
      ),
    );
  }, [normalizedSearch]);

  const totalItems = filteredBooks.length;
  const lastPage = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, lastPage);
  const offset = (safeCurrentPage - 1) * pageSize;

  const pageBooks = useMemo(
    () => filteredBooks.slice(offset, offset + pageSize),
    [filteredBooks, offset, pageSize],
  );

  const currentPageIds = useMemo(
    () => pageBooks.map((book) => book.id),
    [pageBooks],
  );

  const selectedIdSet = useMemo(() => new Set(selectedIds), [selectedIds]);

  const selectedCount = selectedIds.length;
  const allCurrentPageSelected =
    currentPageIds.length > 0 &&
    currentPageIds.every((id) => selectedIdSet.has(id));
  const someCurrentPageSelected =
    currentPageIds.some((id) => selectedIdSet.has(id)) && !allCurrentPageSelected;

  const columns = useMemo<ColumnDef<BibliographicBook>[]>(
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
          <span className="text-sm text-grey-90">{offset + row.index + 1}.</span>
        ),
      },
      {
        accessorKey: "title",
        meta: {
          headClassName: "min-w-[320px]",
          cellClassName: "px-3 py-4",
        },
        header: "Title",
        cell: ({ row }) => {
          const book = row.original;

          return (
            <div className="flex min-w-[320px] items-center gap-3">
              <BookCover
                accent={book.title}
                title={book.coverTitle}
                style={book.coverStyle}
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-grey-100">
                  {book.title}
                </p>
                <p className="mt-1 truncate text-sm italic text-grey-90">{book.author}</p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "isbn",
        meta: {
          cellClassName: "px-3 py-4",
        },
        header: "ISBN/ISSN",
        cell: ({ row }) => <span className="text-grey-90">{row.original.isbn}</span>,
      },
      {
        accessorKey: "copies",
        meta: {
          headClassName: "w-20",
          cellClassName: "px-3 py-4",
        },
        header: "Copies",
        cell: ({ row }) => <span className="text-grey-90">{row.original.copies}</span>,
      },
      {
        accessorKey: "updatedAt",
        meta: {
          headClassName: "w-36",
          cellClassName: "px-3 py-4",
        },
        header: "Last Updated",
        cell: ({ row }) => (
          <span className="text-grey-90">{row.original.updatedAt}</span>
        ),
      },
      {
        id: "actions",
        meta: {
          headClassName: "w-max text-center",
          cellClassName: "px-3 py-4 text-right",
        },
        header: () => <div className="text-right">Action</div>,
        cell: () => (
          <div className="flex items-center justify-end gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-blue-50 hover:bg-blue-10 hover:text-blue-70"
              aria-label="Edit bibliographic item"
            >
              <Pencil className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-red-50 hover:bg-red-10 hover:text-red-60"
              aria-label="Delete bibliographic item"
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
      offset,
      selectedIdSet,
      someCurrentPageSelected,
    ],
  );

  const from = totalItems === 0 ? 0 : offset + 1;
  const to = totalItems === 0 ? 0 : offset + pageBooks.length;

  return (
    <PageContainer className="bg-white pb-10 md:bg-transparent">
      <AppPageHeader title="Bibliography List" />

      <MdUpwardCard className="mt-5">
        <BibliographicToolbar
          search={search}
          selectedCount={selectedCount}
          onSearchChange={(value) => {
            setSearch(value);
            setCurrentPage(1);
          }}
          onClearSearch={() => {
            setSearch("");
            setCurrentPage(1);
          }}
        />

        <Spinner visible={isFiltering}>
          <DataTable
            columns={columns}
            data={pageBooks}
            emptyMessage="No bibliography data found."
          />
        </Spinner>

        <BibliographicFooter
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
          onNextPage={() => setCurrentPage((page) => Math.min(lastPage, page + 1))}
        />
      </MdUpwardCard>
    </PageContainer>
  );
}
