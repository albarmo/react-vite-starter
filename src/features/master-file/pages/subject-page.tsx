"use client";

import { CrossReferenceDeleteModal } from "@/features/master-file/components/cross-reference-delete-modal";
import { SubjectDeleteModal } from "@/features/master-file/components/subject-delete-modal";
import { PageContainer } from "@/shared/components/common/app-page-container";
import { AppPageHeader } from "@/shared/components/common/app-page-header";
import { DataTable } from "@/shared/components/common/data-table";
import { MdUpwardCard } from "@/shared/components/common/md-upward-card";
import { SearchInput } from "@/shared/components/common/search-input";
import { SelectionCheckbox } from "@/shared/components/common/selection-checkbox";
import { Spinner } from "@/shared/components/common/spinner";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
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

type SubjectStatus = "active" | "orphaned";
type SubjectTabValue = "subject" | "cross-reference";

type SubjectRecord = {
  id: string;
  subject: string;
  classificationCode: string;
  type: string;
  authorityFiles: string;
  status: SubjectStatus;
};

type CrossReferenceRecord = {
  id: string;
  code: string;
  description: string;
};

type DeleteTarget =
  | {
      tab: "subject";
      id: string;
    }
  | {
      tab: "cross-reference";
      id: string;
    };

type SubjectToolbarProps = {
  search: string;
  activeFilter: SubjectStatus;
  onCreate: () => void;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onFilterChange: (value: SubjectStatus) => void;
};

type CrossReferenceToolbarProps = {
  search: string;
  onCreate: () => void;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
};

type SubjectFooterProps = {
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

type CrossReferenceFooterProps = {
  pageSize: number;
  totalItems: number;
  displayedCount: number;
  onPageSizeChange: (value: number) => void;
};

const PAGE_SIZE_OPTIONS = [10, 20, 50];
const SUBJECT_BASE_RECORDS: Omit<SubjectRecord, "id">[] = [
  {
    subject: "Andrea Hirata",
    classificationCode: "-",
    type: "Topic",
    authorityFiles: "-",
    status: "active",
  },
  {
    subject: "Computer",
    classificationCode: "asdasd",
    type: "Topic",
    authorityFiles: "fd",
    status: "active",
  },
  {
    subject: "Corruption",
    classificationCode: "-",
    type: "Topic",
    authorityFiles: "-",
    status: "active",
  },
  {
    subject: "Database",
    classificationCode: "-",
    type: "Topic",
    authorityFiles: "-",
    status: "orphaned",
  },
  {
    subject: "Design",
    classificationCode: "-",
    type: "Topic",
    authorityFiles: "-",
    status: "active",
  },
  {
    subject: "Development",
    classificationCode: "-",
    type: "Topic",
    authorityFiles: "-",
    status: "orphaned",
  },
  {
    subject: "Information",
    classificationCode: "-",
    type: "Topic",
    authorityFiles: "-",
    status: "active",
  },
  {
    subject: "Library",
    classificationCode: "-",
    type: "Topic",
    authorityFiles: "-",
    status: "active",
  },
  {
    subject: "Linux",
    classificationCode: "-",
    type: "Topic",
    authorityFiles: "-",
    status: "orphaned",
  },
  {
    subject: "Metadata",
    classificationCode: "-",
    type: "Topic",
    authorityFiles: "-",
    status: "active",
  },
];

const SUBJECT_RECORDS: SubjectRecord[] = Array.from({ length: 1000 }, (_, index) => {
  const base = SUBJECT_BASE_RECORDS[index % SUBJECT_BASE_RECORDS.length];

  return {
    id: `subject-${index + 1}`,
    ...base,
  };
});

const CROSS_REFERENCE_RECORDS: CrossReferenceRecord[] = [
  {
    id: "cross-reference-1",
    code: "BT",
    description: "Broader Term",
  },
  {
    id: "cross-reference-2",
    code: "NT",
    description: "Narrower Term",
  },
  {
    id: "cross-reference-3",
    code: "RT",
    description: "Related Term",
  },
  {
    id: "cross-reference-4",
    code: "SA",
    description: "Related Term",
  },
  {
    id: "cross-reference-5",
    code: "U",
    description: "Use",
  },
  {
    id: "cross-reference-6",
    code: "UF",
    description: "Use For",
  },
];

function CreateButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button
      type="button"
      className="h-11 px-5 self-start lg:self-auto"
      onClick={onClick}
    >
      <Plus className="size-4" />
      Create
    </Button>
  );
}

function SubjectToolbar({
  search,
  activeFilter,
  onCreate,
  onSearchChange,
  onClearSearch,
  onFilterChange,
}: SubjectToolbarProps) {
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

        <CreateButton onClick={onCreate} />
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

function CrossReferenceToolbar({
  search,
  onCreate,
  onSearchChange,
  onClearSearch,
}: CrossReferenceToolbarProps) {
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

      <CreateButton onClick={onCreate} />
    </div>
  );
}

function SubjectFooter({
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
}: SubjectFooterProps) {
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

function CrossReferenceFooter({
  pageSize,
  totalItems,
  displayedCount,
  onPageSizeChange,
}: CrossReferenceFooterProps) {
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
        {totalItems === 0 ? "0 dari 0" : `1 - ${displayedCount} dari ${totalItems}`}
      </p>
    </div>
  );
}

export default function SubjectPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<SubjectTabValue>("subject");
  const [subjectRecords, setSubjectRecords] = useState(SUBJECT_RECORDS);
  const [crossReferenceRecords, setCrossReferenceRecords] = useState(
    CROSS_REFERENCE_RECORDS,
  );
  const [subjectSearch, setSubjectSearch] = useState("");
  const [crossReferenceSearch, setCrossReferenceSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState<SubjectStatus>("active");
  const [subjectPageSize, setSubjectPageSize] = useState(10);
  const [crossReferencePageSize, setCrossReferencePageSize] = useState(10);
  const [subjectCurrentPage, setSubjectCurrentPage] = useState(1);
  const [subjectSelectedIds, setSubjectSelectedIds] = useState<string[]>([]);
  const [crossReferenceSelectedIds, setCrossReferenceSelectedIds] = useState<
    string[]
  >([]);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

  const deferredSubjectSearch = useDeferredValue(subjectSearch);
  const deferredCrossReferenceSearch = useDeferredValue(crossReferenceSearch);
  const normalizedSubjectSearch = deferredSubjectSearch.trim().toLowerCase();
  const normalizedCrossReferenceSearch =
    deferredCrossReferenceSearch.trim().toLowerCase();
  const isSubjectFiltering = subjectSearch !== deferredSubjectSearch;
  const isCrossReferenceFiltering =
    crossReferenceSearch !== deferredCrossReferenceSearch;

  const filteredSubjectRecords = useMemo(() => {
    return subjectRecords.filter((record) => {
      if (record.status !== subjectFilter) return false;
      if (!normalizedSubjectSearch) return true;

      return [
        record.subject,
        record.classificationCode,
        record.type,
        record.authorityFiles,
        record.status,
      ].some((value) => value.toLowerCase().includes(normalizedSubjectSearch));
    });
  }, [normalizedSubjectSearch, subjectFilter, subjectRecords]);

  const filteredCrossReferenceRecords = useMemo(() => {
    if (!normalizedCrossReferenceSearch) return crossReferenceRecords;

    return crossReferenceRecords.filter((record) =>
      [record.code, record.description].some((value) =>
        value.toLowerCase().includes(normalizedCrossReferenceSearch),
      ),
    );
  }, [crossReferenceRecords, normalizedCrossReferenceSearch]);

  const subjectTotalItems = filteredSubjectRecords.length;
  const subjectLastPage = Math.max(
    1,
    Math.ceil(subjectTotalItems / subjectPageSize),
  );
  const safeSubjectCurrentPage = Math.min(subjectCurrentPage, subjectLastPage);
  const subjectOffset = (safeSubjectCurrentPage - 1) * subjectPageSize;
  const subjectPageRecords = useMemo(
    () =>
      filteredSubjectRecords.slice(
        subjectOffset,
        subjectOffset + subjectPageSize,
      ),
    [filteredSubjectRecords, subjectOffset, subjectPageSize],
  );

  const subjectCurrentPageIds = useMemo(
    () => subjectPageRecords.map((record) => record.id),
    [subjectPageRecords],
  );
  const subjectSelectedIdSet = useMemo(
    () => new Set(subjectSelectedIds),
    [subjectSelectedIds],
  );
  const allSubjectCurrentPageSelected =
    subjectCurrentPageIds.length > 0 &&
    subjectCurrentPageIds.every((id) => subjectSelectedIdSet.has(id));
  const someSubjectCurrentPageSelected =
    subjectCurrentPageIds.some((id) => subjectSelectedIdSet.has(id)) &&
    !allSubjectCurrentPageSelected;

  const crossReferencePageRecords = useMemo(
    () => filteredCrossReferenceRecords.slice(0, crossReferencePageSize),
    [crossReferencePageSize, filteredCrossReferenceRecords],
  );
  const crossReferenceCurrentPageIds = useMemo(
    () => crossReferencePageRecords.map((record) => record.id),
    [crossReferencePageRecords],
  );
  const crossReferenceSelectedIdSet = useMemo(
    () => new Set(crossReferenceSelectedIds),
    [crossReferenceSelectedIds],
  );
  const allCrossReferenceCurrentPageSelected =
    crossReferenceCurrentPageIds.length > 0 &&
    crossReferenceCurrentPageIds.every((id) =>
      crossReferenceSelectedIdSet.has(id),
    );
  const someCrossReferenceCurrentPageSelected =
    crossReferenceCurrentPageIds.some((id) =>
      crossReferenceSelectedIdSet.has(id),
    ) && !allCrossReferenceCurrentPageSelected;

  const subjectColumns = useMemo<ColumnDef<SubjectRecord>[]>(
    () => [
      {
        id: "select",
        meta: {
          headClassName: "w-12 px-3",
          cellClassName: "px-3 py-4",
        },
        header: () => (
          <SelectionCheckbox
            checked={allSubjectCurrentPageSelected}
            indeterminate={someSubjectCurrentPageSelected}
            onCheckedChange={(checked) => {
              setSubjectSelectedIds((current) => {
                if (checked) {
                  return Array.from(
                    new Set([...current, ...subjectCurrentPageIds]),
                  );
                }

                const pageIdSet = new Set(subjectCurrentPageIds);
                return current.filter((id) => !pageIdSet.has(id));
              });
            }}
            ariaLabel="Select all subject rows on current page"
          />
        ),
        cell: ({ row }) => (
          <div onClick={(event) => event.stopPropagation()}>
            <SelectionCheckbox
              checked={subjectSelectedIdSet.has(row.original.id)}
              onCheckedChange={(checked) => {
                setSubjectSelectedIds((current) => {
                  if (checked) {
                    return Array.from(new Set([...current, row.original.id]));
                  }

                  return current.filter((id) => id !== row.original.id);
                });
              }}
              ariaLabel={`Select ${row.original.subject}`}
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
            {subjectOffset + row.index + 1}.
          </span>
        ),
      },
      {
        accessorKey: "subject",
        meta: {
          headClassName: "min-w-[190px]",
          cellClassName: "px-3 py-4",
        },
        header: "Subject",
        cell: ({ row }) => (
          <span className="text-base text-grey-90">{row.original.subject}</span>
        ),
      },
      {
        accessorKey: "classificationCode",
        meta: {
          headClassName: "min-w-[190px]",
          cellClassName: "px-3 py-4",
        },
        header: "Classification Code",
        cell: ({ row }) => (
          <span className="text-base text-grey-90">
            {row.original.classificationCode}
          </span>
        ),
      },
      {
        accessorKey: "type",
        meta: {
          headClassName: "w-[160px]",
          cellClassName: "px-3 py-4",
        },
        header: "Type",
        cell: ({ row }) => (
          <span className="text-base text-grey-90">{row.original.type}</span>
        ),
      },
      {
        accessorKey: "authorityFiles",
        meta: {
          headClassName: "min-w-[190px]",
          cellClassName: "px-3 py-4",
        },
        header: "Authority Files",
        cell: ({ row }) => (
          <span className="text-base text-grey-90">
            {row.original.authorityFiles}
          </span>
        ),
      },
      {
        accessorKey: "status",
        meta: {
          headClassName: "w-[160px]",
          cellClassName: "px-3 py-4",
        },
        header: "Status",
        cell: ({ row }) => (
          <Badge
            variant={row.original.status === "active" ? "green" : "secondary"}
            className="rounded-md px-2 py-0.5 text-sm font-medium"
          >
            {row.original.status === "active" ? "Active" : "Orphaned"}
          </Badge>
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
              aria-label={`Edit ${row.original.subject}`}
              className="text-blue-60 hover:bg-blue-10 hover:text-blue-50"
              onClick={(event) => {
                event.stopPropagation();
                navigate(
                  `/master-file/authority-files/subject/edit/${row.original.id}`,
                );
              }}
            >
              <Pencil className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Delete ${row.original.subject}`}
              className="text-red-50 hover:bg-red-10 hover:text-red-60"
              onClick={(event) => {
                event.stopPropagation();
                setDeleteTarget({
                  tab: "subject",
                  id: row.original.id,
                });
              }}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ),
      },
    ],
    [
      allSubjectCurrentPageSelected,
      someSubjectCurrentPageSelected,
      subjectCurrentPageIds,
      subjectOffset,
      subjectSelectedIdSet,
      navigate,
    ],
  );

  const crossReferenceColumns = useMemo<ColumnDef<CrossReferenceRecord>[]>(
    () => [
      {
        id: "select",
        meta: {
          headClassName: "w-12 px-3",
          cellClassName: "px-3 py-4",
        },
        header: () => (
          <SelectionCheckbox
            checked={allCrossReferenceCurrentPageSelected}
            indeterminate={someCrossReferenceCurrentPageSelected}
            onCheckedChange={(checked) => {
              setCrossReferenceSelectedIds((current) => {
                if (checked) {
                  return Array.from(
                    new Set([...current, ...crossReferenceCurrentPageIds]),
                  );
                }

                const pageIdSet = new Set(crossReferenceCurrentPageIds);
                return current.filter((id) => !pageIdSet.has(id));
              });
            }}
            ariaLabel="Select all cross reference rows on current page"
          />
        ),
        cell: ({ row }) => (
          <div onClick={(event) => event.stopPropagation()}>
            <SelectionCheckbox
              checked={crossReferenceSelectedIdSet.has(row.original.id)}
              onCheckedChange={(checked) => {
                setCrossReferenceSelectedIds((current) => {
                  if (checked) {
                    return Array.from(new Set([...current, row.original.id]));
                  }

                  return current.filter((id) => id !== row.original.id);
                });
              }}
              ariaLabel={`Select ${row.original.code}`}
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
          headClassName: "w-[160px]",
          cellClassName: "px-3 py-4",
        },
        header: "Code",
        cell: ({ row }) => (
          <span className="text-base text-grey-90">{row.original.code}</span>
        ),
      },
      {
        accessorKey: "description",
        meta: {
          headClassName: "min-w-[320px]",
          cellClassName: "px-3 py-4",
        },
        header: "Description",
        cell: ({ row }) => (
          <span className="text-base text-grey-90">
            {row.original.description}
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
        cell: ({ row }) => (
          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Edit ${row.original.code}`}
              className="text-blue-60 hover:bg-blue-10 hover:text-blue-50"
              onClick={(event) => {
                event.stopPropagation();
                navigate(
                  `/master-file/authority-files/subject/cross-reference/edit/${row.original.id}`,
                );
              }}
            >
              <Pencil className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Delete ${row.original.code}`}
              className="text-red-50 hover:bg-red-10 hover:text-red-60"
              onClick={(event) => {
                event.stopPropagation();
                setDeleteTarget({
                  tab: "cross-reference",
                  id: row.original.id,
                });
              }}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ),
      },
    ],
    [
      allCrossReferenceCurrentPageSelected,
      crossReferenceCurrentPageIds,
      crossReferenceSelectedIdSet,
      someCrossReferenceCurrentPageSelected,
      navigate,
    ],
  );

  const subjectFrom = subjectTotalItems === 0 ? 0 : subjectOffset + 1;
  const subjectTo =
    subjectTotalItems === 0 ? 0 : subjectOffset + subjectPageRecords.length;

  const handleDelete = () => {
    if (!deleteTarget) return;

    if (deleteTarget.tab === "subject") {
      setSubjectRecords((current) =>
        current.filter((record) => record.id !== deleteTarget.id),
      );
      setSubjectSelectedIds((current) =>
        current.filter((id) => id !== deleteTarget.id),
      );
      setDeleteTarget(null);
      return;
    }

    setCrossReferenceRecords((current) =>
      current.filter((record) => record.id !== deleteTarget.id),
    );
    setCrossReferenceSelectedIds((current) =>
      current.filter((id) => id !== deleteTarget.id),
    );
    setDeleteTarget(null);
  };

  return (
    <PageContainer className="pb-10">
      <AppPageHeader title="Subject" />

      <MdUpwardCard className="mt-5">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as SubjectTabValue)}
        >
          <TabsList className="max-w-60">
            <TabsTrigger value="subject" className="px-2.5">
              Subject
            </TabsTrigger>
            <TabsTrigger value="cross-reference" className="px-2.5">
              Cross Reference
            </TabsTrigger>
          </TabsList>

          <TabsContent value="subject" className="pt-5">
            <SubjectToolbar
              search={subjectSearch}
              activeFilter={subjectFilter}
              onCreate={() =>
                navigate("/master-file/authority-files/subject/create")
              }
              onSearchChange={(value) => {
                setSubjectSearch(value);
                setSubjectCurrentPage(1);
                setSubjectSelectedIds([]);
              }}
              onClearSearch={() => {
                setSubjectSearch("");
                setSubjectCurrentPage(1);
                setSubjectSelectedIds([]);
              }}
              onFilterChange={(value) => {
                setSubjectFilter(value);
                setSubjectCurrentPage(1);
                setSubjectSelectedIds([]);
              }}
            />

            <Spinner visible={isSubjectFiltering}>
              <DataTable
                className="overflow-hidden rounded-md border border-grey-30"
                columns={subjectColumns}
                data={subjectPageRecords}
                emptyMessage="No data."
                onRowClick={(record) =>
                  navigate(
                    `/master-file/authority-files/subject/detail/${record.id}`,
                  )
                }
              />
            </Spinner>

            <SubjectFooter
              currentPage={safeSubjectCurrentPage}
              pageSize={subjectPageSize}
              totalItems={subjectTotalItems}
              from={subjectFrom}
              to={subjectTo}
              canPreviousPage={safeSubjectCurrentPage > 1}
              canNextPage={safeSubjectCurrentPage < subjectLastPage}
              onPageSizeChange={(value) => {
                setSubjectPageSize(value);
                setSubjectCurrentPage(1);
                setSubjectSelectedIds([]);
              }}
              onPreviousPage={() =>
                setSubjectCurrentPage((page) => Math.max(1, page - 1))
              }
              onNextPage={() =>
                setSubjectCurrentPage((page) =>
                  Math.min(subjectLastPage, page + 1),
                )
              }
            />
          </TabsContent>

          <TabsContent value="cross-reference" className="pt-5">
            <CrossReferenceToolbar
              search={crossReferenceSearch}
              onCreate={() =>
                navigate(
                  "/master-file/authority-files/subject/cross-reference/create",
                )
              }
              onSearchChange={(value) => {
                setCrossReferenceSearch(value);
                setCrossReferenceSelectedIds([]);
              }}
              onClearSearch={() => {
                setCrossReferenceSearch("");
                setCrossReferenceSelectedIds([]);
              }}
            />

            <Spinner visible={isCrossReferenceFiltering}>
              <DataTable
                className="overflow-hidden rounded-md border border-grey-30"
                columns={crossReferenceColumns}
                data={crossReferencePageRecords}
                emptyMessage="No data."
                onRowClick={(record) =>
                  navigate(
                    `/master-file/authority-files/subject/cross-reference/detail/${record.id}`,
                  )
                }
              />
            </Spinner>

            <CrossReferenceFooter
              pageSize={crossReferencePageSize}
              totalItems={filteredCrossReferenceRecords.length}
              displayedCount={crossReferencePageRecords.length}
              onPageSizeChange={(value) => {
                setCrossReferencePageSize(value);
                setCrossReferenceSelectedIds([]);
              }}
            />
          </TabsContent>
        </Tabs>
      </MdUpwardCard>

      <SubjectDeleteModal
        open={deleteTarget?.tab === "subject"}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
          }
        }}
        onDelete={handleDelete}
      />

      <CrossReferenceDeleteModal
        open={deleteTarget?.tab === "cross-reference"}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
          }
        }}
        onDelete={handleDelete}
      />
    </PageContainer>
  );
}
