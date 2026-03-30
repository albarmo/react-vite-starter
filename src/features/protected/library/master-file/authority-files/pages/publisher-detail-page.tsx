"use client";

import { PublisherDeleteModal } from "@/features/protected/library/master-file/authority-files/components/publisher-delete-modal";
import type { PublisherDetail } from "@/features/protected/library/master-file/authority-files/types/publisher.types";
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

const PUBLISHER_DETAILS: PublisherDetail[] = [
  {
    id: "publisher-1",
    name: "\\'Gramedia",
    status: "active",
    updatedAt: "05 Mar 2026",
  },
  {
    id: "publisher-2",
    name: "Orphan Publisher",
    status: "orphaned",
    updatedAt: "15 Mar 2026",
  },
];

function PublisherDetailBreadcrumb() {
  return (
    <Breadcrumb className="mt-2">
      <BreadcrumbList className="text-sm text-grey-80">
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="hover:text-blue-50">
            <Link to="/master-file/authority-files/publisher">Publisher</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-grey-70" />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-medium text-blue-50">
            Publisher Detail
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function PublisherDetailPage() {
  const navigate = useNavigate();
  const { id = "publisher-1" } = useParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const detail = useMemo(
    () =>
      PUBLISHER_DETAILS.find((item) => item.id === id) ?? PUBLISHER_DETAILS[0],
    [id],
  );

  return (
    <PageContainer className="pt-6 pb-10 md:pt-8">
      <div>
        <h1 className="text-2xl font-medium text-primary">Publisher Detail</h1>
        <PublisherDetailBreadcrumb />
      </div>

      <MdUpwardCard className="mt-6 rounded-[18px] p-5">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-xl font-medium text-grey-100">
              Publisher Detail
            </h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                navigate(
                  `/master-file/authority-files/publisher/edit/${detail.id}`,
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

        <dl className="mt-8 grid max-w-115 grid-cols-[104px_minmax(0,1fr)] gap-x-8 gap-y-4">
          <dt className="text-grey-90">Name</dt>
          <dd className="text-grey-100">{detail.name}</dd>

          <dt className="text-grey-90">Status</dt>
          <dd>
            <Badge
              variant={detail.status === "active" ? "green" : "orange"}
              className="rounded-md px-2 py-0.5 text-sm font-medium"
            >
              {detail.status === "active" ? "Active" : "Orphaned"}
            </Badge>
          </dd>

          <dt className="text-grey-90">Last Updated</dt>
          <dd className="text-grey-100">{detail.updatedAt}</dd>
        </dl>
      </MdUpwardCard>

      <PublisherDeleteModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onDelete={() => navigate("/master-file/authority-files/publisher")}
      />
    </PageContainer>
  );
}
