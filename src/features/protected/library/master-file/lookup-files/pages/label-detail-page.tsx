"use client";

import { LabelDeleteModal } from "@/features/protected/library/master-file/lookup-files/components/label-delete-modal";
import { getLabelRecordById } from "@/features/protected/library/master-file/lookup-files/components/label-form-presets";
import { PageContainer } from "@/shared/components/common/app-page-container";
import { MdUpwardCard } from "@/shared/components/common/md-upward-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";
import { Button } from "@/shared/components/ui/button";
import { Folder, Pencil, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function formatFileSize(size: number) {
  if (size >= 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }

  return `${Math.round(size / 1024)} KB`;
}

function LabelDetailBreadcrumb() {
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
            <Link to="/master-file/look-up-files">Look Up Files</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-grey-70" />
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="hover:text-blue-50">
            <Link to="/master-file/look-up-files/label">Label</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-grey-70" />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-medium text-blue-50">
            Label Detail
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function LabelDetailPage() {
  const navigate = useNavigate();
  const { id = "label-1" } = useParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const detail = useMemo(() => getLabelRecordById(id), [id]);

  return (
    <PageContainer className="pt-6 pb-10 md:pt-8">
      <div>
        <h1 className="text-2xl font-medium text-primary">Label Detail</h1>
        <LabelDetailBreadcrumb />
      </div>

      <MdUpwardCard className="mt-6 rounded-[18px] p-5">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-xl font-medium text-grey-100">Label Detail</h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                navigate(`/master-file/look-up-files/label/edit/${detail.id}`)
              }
            >
              <Pencil className="size-4" />
              Edit
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

        <dl className="mt-8 grid max-w-140 grid-cols-[124px_minmax(0,1fr)] gap-x-8 gap-y-4">
          <dt className="text-grey-90">Name</dt>
          <dd className="text-grey-100">{detail.name}</dd>

          <dt className="text-grey-90">File Attachment</dt>
          <dd>
            {detail.attachment ? (
              <div className="inline-flex items-center gap-3 rounded-md border border-grey-40 bg-white px-4 py-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-blue-10 text-blue-50">
                  <Folder className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-base font-medium text-grey-100">
                    {detail.attachment.name}
                  </p>
                  <p className="text-sm text-grey-70">
                    {formatFileSize(detail.attachment.size)}
                  </p>
                </div>
              </div>
            ) : (
              <span className="text-grey-90">-</span>
            )}
          </dd>

          <dt className="text-grey-90">Description</dt>
          <dd className="text-grey-100">{detail.description || "-"}</dd>

          <dt className="text-grey-90">Last Updated</dt>
          <dd className="text-grey-100">{detail.updatedAt}</dd>
        </dl>
      </MdUpwardCard>

      <LabelDeleteModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onDelete={() => navigate("/master-file/look-up-files/label")}
      />
    </PageContainer>
  );
}
