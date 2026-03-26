"use client";

import { SubjectDeleteModal } from "@/features/master-file/authority-files/components/subject-delete-modal";
import { PageContainer } from "@/shared/components/common/app-page-container";
import { MdUpwardCard } from "@/shared/components/common/md-upward-card";
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
import { Pencil, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

type SubjectStatus = "active" | "orphaned";

type SubjectDetail = {
  id: string;
  subject: string;
  classificationCode: string;
  type: string;
  authorityFiles: string;
  status: SubjectStatus;
  updatedAt: string;
};

const SUBJECT_DETAIL_PRESETS: Omit<SubjectDetail, "id">[] = [
  {
    subject: "Andrea Hirata",
    classificationCode: "-",
    type: "Topic",
    authorityFiles: "-",
    status: "active",
    updatedAt: "28 Feb 2026",
  },
  {
    subject: "Computer",
    classificationCode: "asdasd",
    type: "Topic",
    authorityFiles: "fd",
    status: "active",
    updatedAt: "15 Mar 2026",
  },
  {
    subject: "Corruption",
    classificationCode: "-",
    type: "Topic",
    authorityFiles: "-",
    status: "active",
    updatedAt: "31 Mar 2026",
  },
  {
    subject: "Database",
    classificationCode: "-",
    type: "Topic",
    authorityFiles: "-",
    status: "orphaned",
    updatedAt: "10 Apr 2026",
  },
  {
    subject: "Design",
    classificationCode: "-",
    type: "Topic",
    authorityFiles: "-",
    status: "active",
    updatedAt: "30 Apr 2026",
  },
  {
    subject: "Development",
    classificationCode: "-",
    type: "Topic",
    authorityFiles: "-",
    status: "orphaned",
    updatedAt: "20 Mei 2026",
  },
  {
    subject: "Information",
    classificationCode: "-",
    type: "Topic",
    authorityFiles: "-",
    status: "active",
    updatedAt: "31 Mei 2026",
  },
  {
    subject: "Library",
    classificationCode: "-",
    type: "Topic",
    authorityFiles: "-",
    status: "active",
    updatedAt: "12 Jun 2026",
  },
  {
    subject: "Linux",
    classificationCode: "-",
    type: "Topic",
    authorityFiles: "-",
    status: "orphaned",
    updatedAt: "30 Jun 2026",
  },
  {
    subject: "Metadata",
    classificationCode: "-",
    type: "Topic",
    authorityFiles: "-",
    status: "active",
    updatedAt: "17 Jul 2026",
  },
];

function SubjectDetailBreadcrumb() {
  return (
    <Breadcrumb className="mt-2">
      <BreadcrumbList className="text-sm text-grey-80">
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="hover:text-blue-50">
            <Link to="/master-file">Master File</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-grey-70" />
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="hover:text-blue-50">
            <Link to="/master-file/authority-files/subject">
              Authority Files
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-grey-70" />
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="hover:text-blue-50">
            <Link to="/master-file/authority-files/subject">Subject</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-grey-70" />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-medium text-blue-50">
            Subject Detail
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function SubjectDetailPage() {
  const navigate = useNavigate();
  const { id = "subject-1" } = useParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const detail = useMemo(() => {
    const matchedIndex = Number.parseInt(id.replace(/^subject-/, ""), 10);
    const safeIndex =
      Number.isFinite(matchedIndex) && matchedIndex > 0 ? matchedIndex - 1 : 0;
    const preset =
      SUBJECT_DETAIL_PRESETS[safeIndex % SUBJECT_DETAIL_PRESETS.length] ??
      SUBJECT_DETAIL_PRESETS[0];

    return {
      id,
      ...preset,
    };
  }, [id]);

  return (
    <PageContainer className="pt-6 pb-10 md:pt-8">
      <div>
        <h1 className="text-2xl font-medium text-primary">Subject Detail</h1>
        <SubjectDetailBreadcrumb />
      </div>

      <MdUpwardCard className="mt-6 rounded-[18px] p-5">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-xl font-medium text-grey-100">
              Subject Detail
            </h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              className="h-11 px-6"
              onClick={() =>
                navigate(
                  `/master-file/authority-files/subject/edit/${detail.id}`,
                )
              }
            >
              <Pencil className="size-4" />
              Edit
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="h-11 px-6"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <Trash2 className="size-4" />
              Delete
            </Button>
          </div>
        </div>

        <dl className="mt-8 grid max-w-130 grid-cols-[130px_minmax(0,1fr)] gap-x-8 gap-y-4">
          <dt className="text-grey-90">Subject</dt>
          <dd className="text-grey-100">{detail.subject}</dd>

          <dt className="text-grey-90">Classification Code</dt>
          <dd className="text-grey-100">{detail.classificationCode}</dd>

          <dt className="text-grey-90">Type</dt>
          <dd className="text-grey-100">{detail.type}</dd>

          <dt className="text-grey-90">Authority Files</dt>
          <dd className="text-grey-100">{detail.authorityFiles}</dd>

          <dt className="text-grey-90">Status</dt>
          <dd>
            <Badge
              variant={detail.status === "active" ? "green" : "secondary"}
              className="rounded-md px-2 py-0.5 text-sm font-medium"
            >
              {detail.status === "active" ? "Active" : "Orphaned"}
            </Badge>
          </dd>

          <dt className="text-grey-90">Last Updated</dt>
          <dd className="text-grey-100">{detail.updatedAt}</dd>
        </dl>
      </MdUpwardCard>

      <SubjectDeleteModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onDelete={() => navigate("/master-file/authority-files/subject")}
      />
    </PageContainer>
  );
}
