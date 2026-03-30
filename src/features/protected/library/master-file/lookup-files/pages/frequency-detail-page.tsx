"use client";

import { FrequencyDeleteModal } from "@/features/protected/library/master-file/lookup-files/components/frequency-delete-modal";
import {
  getFrequencyLanguageLabel,
  getFrequencyRecordById,
  getFrequencyTimeUnitLabel,
} from "@/features/protected/library/master-file/lookup-files/components/frequency-form-presets";
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
import { Pencil, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function FrequencyDetailBreadcrumb() {
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
            <Link to="/master-file/look-up-files/frequency">Frequency</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-grey-70" />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-medium text-blue-50">
            Frequency Detail
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function FrequencyDetailPage() {
  const navigate = useNavigate();
  const { id = "frequency-1" } = useParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const detail = useMemo(() => getFrequencyRecordById(id), [id]);

  return (
    <PageContainer className="pt-6 pb-10 md:pt-8">
      <div>
        <h1 className="text-2xl font-medium text-primary">Frequency Detail</h1>
        <FrequencyDetailBreadcrumb />
      </div>

      <MdUpwardCard className="mt-6 rounded-[18px] p-5">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-xl font-medium text-grey-100">
              Frequency Detail
            </h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                navigate(
                  `/master-file/look-up-files/frequency/edit/${detail.id}`,
                )
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

        <dl className="mt-8 grid max-w-135 grid-cols-[140px_minmax(0,1fr)] gap-x-8 gap-y-4">
          <dt className="text-grey-90">Frequency</dt>
          <dd className="text-grey-100">{detail.frequency}</dd>

          <dt className="text-grey-90">Language</dt>
          <dd className="text-grey-100">
            {getFrequencyLanguageLabel(detail.language)}
          </dd>

          <dt className="text-grey-90">Time Increment</dt>
          <dd className="text-grey-100">{detail.timeIncrement}</dd>

          <dt className="text-grey-90">Time Unit</dt>
          <dd className="text-grey-100">
            {getFrequencyTimeUnitLabel(detail.timeUnit)}
          </dd>

          <dt className="text-grey-90">Last Updated</dt>
          <dd className="text-grey-100">{detail.updatedAt}</dd>
        </dl>
      </MdUpwardCard>

      <FrequencyDeleteModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onDelete={() => navigate("/master-file/look-up-files/frequency")}
      />
    </PageContainer>
  );
}
