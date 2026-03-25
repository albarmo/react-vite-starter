"use client";

import { BibliographicDeleteModal } from "@/features/bibliographic/components/bibliographic-delete-modal";
import { PageContainer } from "@/shared/components/common/app-page-container";
import { MdUpwardCard } from "@/shared/components/common/md-upward-card";
import { SearchInput } from "@/shared/components/common/search-input";
import { Badge } from "@/shared/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { cn } from "@/shared/lib/cn";
import { ChevronDown, Heart, Pencil, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

type BibliographicDetailField = {
  label: string;
  value: string;
  multiline?: boolean;
};

type BibliographicLogEntry = {
  id: string;
  lastUpdated: string;
  userName: string;
  details: string[];
};

const PAGE_SIZE_OPTIONS = [10, 20, 50];

const BIBLIOGRAPHIC_DETAIL_FIELDS: BibliographicDetailField[] = [
  { label: "Title", value: "The Let Them Theory" },
  { label: "Author(s)", value: "Mel Robbins, Personal Name, Primary Author" },
  { label: "Statement of Responsibility", value: "-" },
  { label: "Edition", value: "-" },
  { label: "Specific Detail Info", value: "-" },
  { label: "Item(s) Code Batch Generator", value: "P00000S" },
  { label: "Total Item(s)", value: "5" },
  { label: "GMD", value: "Text" },
  { label: "Content Type", value: "-" },
  { label: "Media Type", value: "-" },
  { label: "Carrier Type", value: "-" },
  { label: "Frequency", value: "-" },
  { label: "ISBN/ISSN", value: "625221049" },
  { label: "Publisher", value: "Gramedia Pustaka Utama" },
  { label: "Publishing Year", value: "2025" },
  { label: "Publisher Place", value: "-" },
  { label: "Collation", value: "-" },
  { label: "Series Title", value: "-" },
  { label: "Classification", value: "-" },
  { label: "Call Number", value: "-" },
  { label: "Subject", value: "-" },
  { label: "Language", value: "Indonesia" },
];

const ABSTRACT_NOTES =
  "Let Them; dua kata sederhana yang mengajak kita melepaskan hal-hal di luar kendali, agar energi hidup bisa fokus pada pilihan, tujuan, dan kebahagiaan yang benar-benar ingin dibangun. Buku ini membahas cara melihat ulang relasi, ambisi, dan rasa takut dengan pendekatan yang lebih tenang dan praktis.";

const RELATED_BIBLIO_DATA = [
  "The Direct Source",
  "Radical Acceptance & Letting Go",
  "Boundaries & Relations",
];

const LABELS = ["New Title", "Favorite Title"];

const BIBLIOGRAPHIC_LOGS: BibliographicLogEntry[] = [
  {
    id: "log-1",
    lastUpdated: "28 Feb 2026, 09:46:17",
    userName: "Admin",
    details: [
      "The Let Them Theory",
      "- create description : New data. Bibliography.",
      "- update author : New data. Author. Names: Mel Robbins;",
    ],
  },
  {
    id: "log-2",
    lastUpdated: "02 Mar 2026, 13:18:02",
    userName: "Admin",
    details: [
      "The Let Them Theory",
      "- update total items : 3 menjadi 5.",
      "- update publishing year : 2024 menjadi 2025.",
    ],
  },
  {
    id: "log-3",
    lastUpdated: "05 Mar 2026, 10:02:44",
    userName: "Cataloger",
    details: [
      "The Let Them Theory",
      "- update ISBN/ISSN : 625221049.",
      "- update label : Favorite Title.",
    ],
  },
  {
    id: "log-4",
    lastUpdated: "06 Mar 2026, 11:27:51",
    userName: "Admin",
    details: ["The Let Them Theory", "- update attachment : nama.file.pdf."],
  },
  {
    id: "log-5",
    lastUpdated: "10 Mar 2026, 08:12:36",
    userName: "Admin",
    details: ["The Let Them Theory", "- update language : Indonesia."],
  },
  {
    id: "log-6",
    lastUpdated: "12 Mar 2026, 16:45:11",
    userName: "Librarian",
    details: ["The Let Them Theory", "- update related biblio data."],
  },
  {
    id: "log-7",
    lastUpdated: "13 Mar 2026, 07:21:02",
    userName: "Admin",
    details: ["The Let Them Theory", "- update GMD : Text."],
  },
  {
    id: "log-8",
    lastUpdated: "15 Mar 2026, 18:04:27",
    userName: "Admin",
    details: ["The Let Them Theory", "- update OPAC visibility : Show."],
  },
  {
    id: "log-9",
    lastUpdated: "18 Mar 2026, 14:22:09",
    userName: "Cataloger",
    details: ["The Let Them Theory", "- update homepage promotion : Promote."],
  },
  {
    id: "log-10",
    lastUpdated: "20 Mar 2026, 09:03:15",
    userName: "Admin",
    details: ["The Let Them Theory", "- update abstract/notes."],
  },
];

function BibliographicDetailBreadcrumb() {
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
            Bibliography Detail
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function BookPreviewCard() {
  return (
    <div className="overflow-hidden rounded-[14px] border border-grey-40 bg-white shadow-xs">
      <div className="relative flex h-77.5 items-end overflow-hidden bg-[linear-gradient(180deg,#08a86f_0%,#08b57c_100%)] px-4 py-5">
        <div className="absolute inset-x-0 top-4 text-center text-[10px] font-semibold tracking-[0.04em] text-black uppercase">
          Alat untuk Mengubah Hidup yang
          <br />
          Tak Henti Dibicarakan oleh Jutaan Orang
        </div>
        <div className="absolute top-3 right-4 rounded-sm border border-white/70 px-1 py-0.5 text-[8px] font-semibold text-white">
          GM
        </div>

        <div className="w-full text-center">
          <p className="text-3xl font-semibold tracking-[0.14em] text-black">
            THE
          </p>
          <p className="mt-1 text-[76px] leading-[0.9] font-black tracking-[-0.05em] text-[#f6f065]">
            LET
          </p>
          <p className="text-[76px] leading-[0.9] font-black tracking-[-0.05em] text-[#f6f065]">
            THEM
          </p>
          <p className="mt-2 text-[46px] leading-none font-semibold tracking-[-0.04em] text-black">
            THEORY
          </p>
          <p className="mt-5 text-[24px] leading-none font-semibold tracking-[-0.05em] text-black">
            Mel Robbins
          </p>
          <p className="mt-2 text-[11px] font-medium text-black">
            dan Sawyer Robbins
          </p>
        </div>

        <div className="absolute right-4 bottom-10 flex size-10 items-center justify-center rounded-full bg-yellow text-[8px] leading-[1.1] font-bold text-black">
          <span className="text-center">
            MEGA
            <br />
            BEST
            <br />
            SELLER
          </span>
        </div>
      </div>

      <div className="space-y-1 px-4 py-4">
        <div className="flex items-center gap-2 text-blue-50">
          <Heart className="size-4 fill-current" />
        </div>
        <p className="text-sm text-grey-80">Mel Robbins</p>
        <p className="text-xl font-medium text-grey-100">The Let Them Theory</p>
      </div>
    </div>
  );
}

function DetailField({
  label,
  value,
  multiline = false,
}: BibliographicDetailField) {
  return (
    <>
      <dt className="text-grey-90">{label}</dt>
      <dd className={cn("text-grey-100", multiline ? "leading-8" : "min-h-7")}>
        {value}
      </dd>
    </>
  );
}

export function BibliographicDetailPage() {
  const { id = "book-10" } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("detail");
  const [logSearch, setLogSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [isAbstractExpanded, setIsAbstractExpanded] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const bibliographicTitle =
    BIBLIOGRAPHIC_DETAIL_FIELDS.find((field) => field.label === "Title")
      ?.value ?? "Untitled";

  const filteredLogs = useMemo(() => {
    const normalizedSearch = logSearch.trim().toLowerCase();
    if (!normalizedSearch) return BIBLIOGRAPHIC_LOGS;

    return BIBLIOGRAPHIC_LOGS.filter((entry) =>
      [entry.lastUpdated, entry.userName, ...entry.details]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch),
    );
  }, [logSearch]);

  const visibleLogs = filteredLogs.slice(0, pageSize);
  const abstractPreview =
    isAbstractExpanded || ABSTRACT_NOTES.length <= 155
      ? ABSTRACT_NOTES
      : `${ABSTRACT_NOTES.slice(0, 155).trimEnd()}...`;

  return (
    <PageContainer className="pt-6 pb-10 md:pt-8">
      <div>
        <h1 className="text-2xl font-medium text-primary">
          Bibliography Detail
        </h1>
        <BibliographicDetailBreadcrumb />
      </div>

      <MdUpwardCard className="mt-6 rounded-[18px] p-4 md:p-5">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="max-w-45">
            <TabsTrigger value="detail" className="px-2.5">
              Detail
            </TabsTrigger>
            <TabsTrigger value="log" className="px-2.5">
              Log
            </TabsTrigger>
          </TabsList>

          <TabsContent value="detail" className="pt-5">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <h2 className="text-xl font-medium text-grey-100">
                Bibliography Detail
              </h2>

              <div className="flex flex-wrap items-center gap-3">
                <Button type="button" variant="outline" asChild>
                  <Link to={`/bibliographic/edit/${id}`}>
                    <Pencil className="size-4" />
                    Edit
                  </Link>
                </Button>

                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  <Trash2 className="size-4" />
                  Delete
                </Button>
              </div>
            </div>

            <div className="grid gap-8 xl:grid-cols-[224px_minmax(0,1fr)]">
              <div className="w-full max-w-56">
                <BookPreviewCard />
              </div>

              <div className="min-w-0">
                <dl className="grid gap-x-8 gap-y-3 md:grid-cols-[210px_minmax(0,1fr)]">
                  {BIBLIOGRAPHIC_DETAIL_FIELDS.map((field) => (
                    <DetailField key={field.label} {...field} />
                  ))}

                  <dt className="text-grey-90">Abstract/Notes</dt>
                  <dd className="space-y-2 leading-8 text-grey-100">
                    <p>{abstractPreview}</p>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 text-base font-medium text-blue-50"
                      onClick={() =>
                        setIsAbstractExpanded((current) => !current)
                      }
                    >
                      {isAbstractExpanded
                        ? "Tampilkan lebih sedikit"
                        : "Selengkapnya"}
                      <ChevronDown
                        className={cn(
                          "size-4 transition-transform",
                          isAbstractExpanded ? "rotate-180" : "rotate-0",
                        )}
                      />
                    </button>
                  </dd>

                  <dt className="text-grey-90">File Attachment</dt>
                  <dd>
                    <Badge
                      variant="outline"
                      className="rounded-xl border-grey-40 px-4 py-2 text-base font-medium text-blue-50"
                    >
                      nama.file.pdf
                    </Badge>
                  </dd>

                  <dt className="text-grey-90">Related Biblio Data</dt>
                  <dd className="leading-8 text-grey-100">
                    {RELATED_BIBLIO_DATA.join(", ")}
                  </dd>

                  <dt className="text-grey-90">Hide in OPAC</dt>
                  <dd className="text-grey-100">Show</dd>

                  <dt className="text-grey-90">Promote to Homepage</dt>
                  <dd className="text-grey-100">Promote</dd>

                  <dt className="text-grey-90">Label</dt>
                  <dd className="text-grey-100">{LABELS.join(", ")}</dd>
                </dl>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="log" className="pt-5">
            <div className="space-y-6">
              <h2 className="text-2xl font-medium text-grey-100">Log</h2>

              <div className="max-w-75">
                <SearchInput
                  value={logSearch}
                  onChange={(event) => setLogSearch(event.target.value)}
                  onClear={() => setLogSearch("")}
                  allowClear
                  placeholder="Search"
                />
              </div>

              <div className="overflow-hidden rounded-[12px] border border-grey-40">
                <Table>
                  <TableHeader className="bg-grey-30">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-47.5 px-3 text-sm font-semibold text-grey-90">
                        Last Updated
                      </TableHead>
                      <TableHead className="w-30 px-3 text-sm font-semibold text-grey-90">
                        User Name
                      </TableHead>
                      <TableHead className="px-3 text-sm font-semibold text-grey-90">
                        Additional Information
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {visibleLogs.map((entry) => (
                      <TableRow key={entry.id} className="hover:bg-transparent">
                        <TableCell className="px-3 py-3 align-top text-base text-grey-90">
                          {entry.lastUpdated}
                        </TableCell>
                        <TableCell className="px-3 py-3 align-top text-base text-grey-90">
                          {entry.userName}
                        </TableCell>
                        <TableCell className="px-3 py-3 align-top">
                          <div className="space-y-1 text-base leading-8 text-grey-90">
                            {entry.details.map((detail) => (
                              <p key={detail}>{detail}</p>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3 text-grey-90">
                  <span>Showing</span>
                  <Select
                    value={String(pageSize)}
                    onValueChange={(value) => setPageSize(Number(value))}
                  >
                    <SelectTrigger className="h-9 w-[72px] rounded-xl border-grey-40 bg-white text-base text-grey-100 shadow-none">
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

                <p className="text-grey-90">
                  {filteredLogs.length === 0
                    ? "0 - 0 of 0"
                    : `1 - ${Math.min(pageSize, filteredLogs.length)} of ${filteredLogs.length}`}
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </MdUpwardCard>

      <BibliographicDeleteModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onDelete={() => navigate("/bibliographic/list")}
        description={
          <>
            Are you sure you want to delete the book{" "}
            <span className="font-medium text-grey-80">
              {bibliographicTitle}
            </span>
            ?
          </>
        }
      />
    </PageContainer>
  );
}
