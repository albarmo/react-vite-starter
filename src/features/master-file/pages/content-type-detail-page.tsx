"use client";

import { ContentTypeDeleteModal } from "@/features/master-file/components/content-type-delete-modal";
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

type ContentTypeDetail = {
  id: string;
  code: string;
  name: string;
  updatedAt: string;
};

const CONTENT_TYPE_DETAILS: ContentTypeDetail[] = [
  {
    id: "content-type-1",
    code: "crd",
    name: "cartographic dataset",
    updatedAt: "28 Feb 2026",
  },
  {
    id: "content-type-2",
    code: "cri",
    name: "cartographic image",
    updatedAt: "15 Mar 2026",
  },
  {
    id: "content-type-3",
    code: "crm",
    name: "cartographic moving image",
    updatedAt: "31 Mar 2026",
  },
  {
    id: "content-type-4",
    code: "crt",
    name: "cartographic tactile image",
    updatedAt: "10 Apr 2026",
  },
  {
    id: "content-type-5",
    code: "crn",
    name: "cartographic tactile three-dimensional form",
    updatedAt: "30 Apr 2026",
  },
];

function ContentTypeDetailBreadcrumb() {
  return (
    <Breadcrumb className="mt-2">
      <BreadcrumbList className="text-sm text-grey-80">
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="hover:text-blue-50">
            <Link to="/master-file/authority-files/content-type">
              Content Type
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-grey-70" />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-medium text-blue-50">
            Content Type Detail
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function ContentTypeDetailPage() {
  const navigate = useNavigate();
  const { id = "content-type-3" } = useParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const detail = useMemo(
    () =>
      CONTENT_TYPE_DETAILS.find((item) => item.id === id) ??
      CONTENT_TYPE_DETAILS[2],
    [id],
  );

  return (
    <PageContainer className="pt-6 pb-10 md:pt-8">
      <div>
        <h1 className="text-2xl font-medium text-primary">
          Content Type Detail
        </h1>
        <ContentTypeDetailBreadcrumb />
      </div>

      <MdUpwardCard className="mt-6 rounded-[18px] p-5">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-xl font-medium text-grey-100">
              Content Type Detail
            </h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              className="h-11 px-6"
              onClick={() =>
                navigate(`/master-file/authority-files/content-type/edit/${detail.id}`)
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

        <dl className="mt-8 grid max-w-120 grid-cols-[104px_minmax(0,1fr)] gap-x-8 gap-y-4">
          <dt className="text-grey-90">Code</dt>
          <dd className="text-grey-100">{detail.code}</dd>

          <dt className="text-grey-90">Name</dt>
          <dd className="text-grey-100">{detail.name}</dd>

          <dt className="text-grey-90">Last Updated</dt>
          <dd className="text-grey-100">{detail.updatedAt}</dd>
        </dl>
      </MdUpwardCard>

      <ContentTypeDeleteModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onDelete={() => navigate("/master-file/authority-files/content-type")}
      />
    </PageContainer>
  );
}
