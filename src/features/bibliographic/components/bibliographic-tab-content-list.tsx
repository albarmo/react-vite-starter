"use client";

import { useUiStore } from "@/app/store/ui.store";
import { BibliographicDeleteModal } from "@/features/bibliographic/components/bibliographic-delete-modal";
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
import { cn } from "@/shared/lib/cn";
import { type ColumnDef } from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Eye,
  Pencil,
  Plus,
  Printer,
  Trash2,
} from "lucide-react";
import type { CSSProperties } from "react";
import { useDeferredValue, useMemo, useState } from "react";
import { Link } from "react-router-dom";

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

type DeleteTarget =
  | {
      type: "single";
      book: BibliographicBook;
    }
  | {
      type: "selected";
      ids: string[];
    };

type BibliographicToolbarProps = {
  search: string;
  selectedCount: number;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onOpenExportModal: () => void;
  onOpenImportModal: () => void;
  onDeleteSelected: () => void;
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

type BibliographicSelectionBarProps = {
  selectedCount: number;
  sidebarOpen: boolean;
  onDeleteSelected: () => void;
};

const PAGE_SIZE_OPTIONS = [10, 20, 50];
const COVER_STYLES: CSSProperties[] = [
  {
    background: "linear-gradient(180deg, #122033 0%, #1a8a84 100%)",
    color: "#ffffff",
  },
  {
    background: "linear-gradient(180deg, #3a244f 0%, #a884ff 100%)",
    color: "#fff7c2",
  },
  {
    background: "linear-gradient(180deg, #f0e6d7 0%, #f8f3eb 100%)",
    color: "#243447",
  },
  {
    background: "linear-gradient(180deg, #d8f0c9 0%, #f4fae8 100%)",
    color: "#22412f",
  },
  {
    background: "linear-gradient(180deg, #c1e9f5 0%, #fde8b7 100%)",
    color: "#24425a",
  },
  {
    background: "linear-gradient(180deg, #1d1a1a 0%, #564742 100%)",
    color: "#f6f0df",
  },
  {
    background: "linear-gradient(180deg, #2b6ea6 0%, #f2c94c 100%)",
    color: "#ffffff",
  },
  {
    background: "linear-gradient(180deg, #7143a8 0%, #d3b5ff 100%)",
    color: "#ffffff",
  },
  {
    background: "linear-gradient(180deg, #ffffff 0%, #fff4f4 100%)",
    color: "#d92d20",
  },
  {
    background: "linear-gradient(180deg, #17b66d 0%, #d7ffbb 100%)",
    color: "#ffffff",
  },
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
      <span className="line-clamp-4 text-[5px] font-medium uppercase opacity-80">
        {accent}
      </span>
      <span className="text-[4px] leading-[1.05] font-light tracking-[0.04em] uppercase">
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
  onOpenExportModal,
  onOpenImportModal,
  onDeleteSelected,
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
              Export
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={onOpenImportModal}>
              Import
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              disabled={selectedCount === 0}
              variant="destructive"
              onSelect={onDeleteSelected}
            >
              Delete selected
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button type="button" asChild>
          <Link to="/bibliographic/create">
            <Plus className="size-4" />
            Create
          </Link>
        </Button>
      </div>
    </div>
  );
}

function BibliographicSelectionBar({
  selectedCount,
  sidebarOpen,
  onDeleteSelected,
}: BibliographicSelectionBarProps) {
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-grey-30 bg-white/95 shadow-[0_-18px_48px_rgba(15,23,42,0.08)] backdrop-blur",
        sidebarOpen ? "md:left-68" : "md:left-20",
      )}
    >
      <div className="mx-auto flex w-full max-w-310 flex-col gap-4 px-3 py-4 sm:px-4 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="min-w-0">
          <p className="text-base font-medium text-grey-100">
            {selectedCount} item dipilih
          </p>
          <p className="text-sm text-grey-80">
            item yang sudah dicentang dari daftar bibliografi.
          </p>
        </div>

        <section className="grid grid-cols-2 gap-3.5">
          <Button
            type="button"
            size="lg"
            variant="outline"
            onClick={onDeleteSelected}
          >
            <Trash2 className="size-4" />
            Print Catalog
          </Button>
          <Button
            type="button"
            size="lg"
            variant="destructive"
            onClick={onDeleteSelected}
          >
            <Trash2 className="size-4" />
            Delete
          </Button>
        </section>
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

export function BibliographicTabContentList() {
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);
  const [books, setBooks] = useState(BIBLIOGRAPHIC_BOOKS);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const deferredSearch = useDeferredValue(search);
  const normalizedSearch = deferredSearch.trim().toLowerCase();
  const isFiltering = search !== deferredSearch;

  const filteredBooks = useMemo(() => {
    if (!normalizedSearch) return books;

    return books.filter((book) =>
      [book.title, book.author, book.isbn].some((value) =>
        value.toLowerCase().includes(normalizedSearch),
      ),
    );
  }, [books, normalizedSearch]);

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
      const { id } = deleteTarget.book;
      setBooks((current) => current.filter((book) => book.id !== id));
      setSelectedIds((current) =>
        current.filter((selectedId) => selectedId !== id),
      );
      return;
    }

    const deleteIdSet = new Set(deleteTarget.ids);
    setBooks((current) => current.filter((book) => !deleteIdSet.has(book.id)));
    setSelectedIds((current) =>
      current.filter((selectedId) => !deleteIdSet.has(selectedId)),
    );
  };

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
          <span className="text-base text-grey-90">
            {offset + row.index + 1}.
          </span>
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
            <Link
              to={`/bibliographic/detail/${book.id}`}
              className="group flex min-w-[320px] items-center gap-3"
            >
              <BookCover
                accent={book.title}
                title={book.coverTitle}
                style={book.coverStyle}
              />
              <div className="min-w-0">
                <p className="truncate text-base font-semibold text-grey-100 transition-colors group-hover:text-primary">
                  {book.title}
                </p>
                <p className="mt-1 truncate text-base text-grey-90 italic">
                  {book.author}
                </p>
              </div>
            </Link>
          );
        },
      },
      {
        accessorKey: "isbn",
        meta: {
          cellClassName: "px-3 py-4",
        },
        header: "ISBN/ISSN",
        cell: ({ row }) => (
          <span className="text-grey-90">{row.original.isbn}</span>
        ),
      },
      {
        accessorKey: "copies",
        meta: {
          headClassName: "w-20",
          cellClassName: "px-3 py-4",
        },
        header: "Copies",
        cell: ({ row }) => (
          <span className="text-grey-90">{row.original.copies}</span>
        ),
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
          headClassName: "w-20 text-center",
          cellClassName: "px-3 py-4 text-right",
        },
        header: () => <div className="text-right">Action</div>,
        cell: ({ row }) => {
          const book = row.original;

          return (
            <div className="flex items-center justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Open actions for ${book.title}`}
                  >
                    <EllipsisVertical className="size-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-48 rounded-md border-grey-30"
                >
                  <DropdownMenuItem asChild>
                    <Link to={`/bibliographic/detail/${book.id}`}>
                      <Eye className="size-4" />
                      Detail
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={`/bibliographic/edit/${book.id}`}>
                      <Pencil className="size-4" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => {}}>
                    <Printer className="size-4" />
                    Print Catalog
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onSelect={() => setDeleteTarget({ type: "single", book })}
                  >
                    <Trash2 className="size-4" />
                    Delete
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
  const to = totalItems === 0 ? 0 : offset + pageBooks.length;

  return (
    <div className={selectedCount > 0 ? "pb-32 md:pb-36" : undefined}>
      <BibliographicToolbar
        search={search}
        selectedCount={selectedCount}
        onSearchChange={(value) => {
          setSearch(value);
          setCurrentPage(1);
        }}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onOpenImportModal={() => setIsImportModalOpen(true)}
        onDeleteSelected={handleOpenDeleteSelected}
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
        onNextPage={() =>
          setCurrentPage((page) => Math.min(lastPage, page + 1))
        }
      />

      {selectedCount > 0 && (
        <BibliographicSelectionBar
          selectedCount={selectedCount}
          sidebarOpen={sidebarOpen}
          onDeleteSelected={handleOpenDeleteSelected}
        />
      )}

      <BibliographicDeleteModal
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
          }
        }}
        onDelete={handleConfirmDelete}
        description={
          deleteTarget?.type === "single" ? (
            <>
              Are you sure you want to delete the book{" "}
              <span className="font-medium text-grey-80">
                {deleteTarget.book.title}
              </span>
              ?
            </>
          ) : (
            <>
              Are you sure you want to delete{" "}
              <span className="font-medium text-grey-80">
                {deleteTarget?.ids.length ?? 0} selected bibliographies
              </span>
              ?
            </>
          )
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
    </div>
  );
}
