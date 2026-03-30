"use client";

import {
  BOOK_REQUEST_PRESET_RECORDS,
  getBookRequestStatusLabel,
} from "@/features/protected/library/bibliographic/components/book-request-presets";
import type {
  BookRequestActionMenuProps,
  BookRequestRecord,
  BookRequestsFooterProps,
  BookRequestStatus,
  BookRequestsToolbarProps,
} from "@/features/protected/library/bibliographic/types/book-request.types";
import { PageContainer } from "@/shared/components/common/app-page-container";
import { AppPageHeader } from "@/shared/components/common/app-page-header";
import { DataTable } from "@/shared/components/common/data-table";
import { MdUpwardCard } from "@/shared/components/common/md-upward-card";
import { SearchInput } from "@/shared/components/common/search-input";
import { Spinner } from "@/shared/components/common/spinner";
import { Badge } from "@/shared/components/ui/badge";
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
  EllipsisVertical,
  Eye,
  FileSpreadsheet,
} from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE_OPTIONS = [10, 20, 50];

function getStatusVariant(status: BookRequestStatus) {
  switch (status) {
    case "approved":
      return "green";
    case "rejected":
      return "red";
    case "pending":
    default:
      return "orange";
  }
}

function BookRequestsToolbar({
  search,
  onSearchChange,
  onClearSearch,
}: BookRequestsToolbarProps) {
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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="outline">
            Export
            <ChevronDown className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-44 rounded-md border-grey-30"
        >
          <DropdownMenuItem>
            <FileSpreadsheet className="size-4" />
            Export CSV
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FileSpreadsheet className="size-4" />
            Export Excel
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function BookRequestActionMenu({
  request,
  onOpenDetail,
}: BookRequestActionMenuProps) {
  return (
    <div onClick={(event) => event.stopPropagation()}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="hover:text-blue-60 text-blue-50 hover:bg-blue-10"
            aria-label={`Open actions for ${request.title}`}
          >
            <EllipsisVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-44 rounded-md border-grey-30"
        >
          <DropdownMenuItem onSelect={() => onOpenDetail(request.id)}>
            <Eye className="size-4" />
            Detail
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function BookRequestsFooter({
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
}: BookRequestsFooterProps) {
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
          {totalItems === 0 ? "0 of 0" : `${from} - ${to} of ${totalItems}`}
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

export default function BookRequestsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const deferredSearch = useDeferredValue(search);
  const normalizedSearch = deferredSearch.trim().toLowerCase();
  const isFiltering = search !== deferredSearch;

  const filteredRequests = useMemo(() => {
    if (!normalizedSearch) return BOOK_REQUEST_PRESET_RECORDS;

    return BOOK_REQUEST_PRESET_RECORDS.filter((request) =>
      [
        request.memberId,
        request.name,
        request.title,
        request.requestDate,
        request.author,
        request.isbn,
        getBookRequestStatusLabel(request.status),
      ].some((value) => value.toLowerCase().includes(normalizedSearch)),
    );
  }, [normalizedSearch]);

  const totalItems = filteredRequests.length;
  const lastPage = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, lastPage);
  const offset = (safeCurrentPage - 1) * pageSize;

  const pageRequests = useMemo(
    () => filteredRequests.slice(offset, offset + pageSize),
    [filteredRequests, offset, pageSize],
  );

  const columns = useMemo<ColumnDef<BookRequestRecord>[]>(
    () => [
      {
        accessorKey: "memberId",
        meta: {
          headClassName: "min-w-24 px-2",
          cellClassName: "px-2 py-4",
        },
        header: "Member ID",
        cell: ({ row }) => (
          <span className="text-base text-grey-90">
            {row.original.memberId}
          </span>
        ),
      },
      {
        accessorKey: "name",
        meta: {
          headClassName: "min-w-40 px-2",
          cellClassName: "px-2 py-4",
        },
        header: "Name",
        cell: ({ row }) => (
          <span className="text-base text-grey-100">{row.original.name}</span>
        ),
      },
      {
        accessorKey: "title",
        meta: {
          headClassName: "min-w-85 px-2",
          cellClassName: "px-2 py-4",
        },
        header: "Title",
        cell: ({ row }) => (
          <span className="text-base text-grey-100">{row.original.title}</span>
        ),
      },
      {
        accessorKey: "requestDate",
        meta: {
          headClassName: "min-w-30 px-2",
          cellClassName: "px-2 py-4",
        },
        header: "Request Date",
        cell: ({ row }) => (
          <span className="text-base text-grey-90">
            {row.original.requestDate}
          </span>
        ),
      },
      {
        accessorKey: "status",
        meta: {
          headClassName: "min-w-24 px-2",
          cellClassName: "px-2 py-4",
        },
        header: "Status",
        cell: ({ row }) => (
          <Badge variant={getStatusVariant(row.original.status)}>
            {getBookRequestStatusLabel(row.original.status)}
          </Badge>
        ),
      },
      {
        id: "actions",
        meta: {
          headClassName: "w-20 px-3 text-right",
          cellClassName: "px-3 py-4 text-right",
        },
        header: "Action",
        cell: ({ row }) => (
          <BookRequestActionMenu
            request={row.original}
            onOpenDetail={(id) =>
              navigate(`/bibliographic/book-requests/detail/${id}`)
            }
          />
        ),
      },
    ],
    [navigate],
  );

  return (
    <PageContainer className="pt-6 pb-10 md:pt-8">
      <AppPageHeader title="Book Requests" />

      <MdUpwardCard className="mt-6 rounded-[18px] p-5">
        <BookRequestsToolbar
          search={search}
          onSearchChange={(value) => {
            setSearch(value);
            setCurrentPage(1);
          }}
          onClearSearch={() => {
            setSearch("");
            setCurrentPage(1);
          }}
        />

        {isFiltering ? (
          <div className="flex justify-center py-10">
            <Spinner />
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={pageRequests}
            emptyMessage="No book requests found."
            onRowClick={(request) =>
              navigate(`/bibliographic/book-requests/detail/${request.id}`)
            }
          />
        )}

        <BookRequestsFooter
          currentPage={safeCurrentPage}
          pageSize={pageSize}
          totalItems={totalItems}
          from={totalItems === 0 ? 0 : offset + 1}
          to={Math.min(offset + pageSize, totalItems)}
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
      </MdUpwardCard>
    </PageContainer>
  );
}
