"use client";

import { CatalogingServerDeleteModal } from "@/features/protected/library/master-file/tools/components/cataloging-server-delete-modal";
import {
  getCatalogingServerRecordById,
  getCatalogingServerTypeLabel,
} from "@/features/protected/library/master-file/tools/components/cataloging-server-form-presets";
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

function CatalogingServersDetailBreadcrumb() {
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
            <Link to="/master-file/tools">Tools</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-grey-70" />
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="hover:text-blue-50">
            <Link to="/master-file/tools/cataloging-servers">
              Cataloging Servers
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-grey-70" />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-medium text-blue-50">
            Cataloging Servers Detail
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function CatalogingServersDetailPage() {
  const navigate = useNavigate();
  const { id = "cataloging-server-1" } = useParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const detail = useMemo(() => getCatalogingServerRecordById(id), [id]);

  return (
    <PageContainer className="pt-6 pb-10 md:pt-8">
      <div>
        <h1 className="text-2xl font-medium text-primary">
          Cataloging Servers Detail
        </h1>
        <CatalogingServersDetailBreadcrumb />
      </div>

      <MdUpwardCard className="mt-6 rounded-[18px] p-5">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-xl font-medium text-grey-100">
              Cataloging Servers Detail
            </h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                navigate(
                  `/master-file/tools/cataloging-servers/edit/${detail.id}`,
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

        <dl className="mt-8 grid max-w-135 grid-cols-[104px_minmax(0,1fr)] gap-x-8 gap-y-4">
          <dt className="text-grey-90">Name</dt>
          <dd className="text-grey-100">{detail.name}</dd>

          <dt className="text-grey-90">URL</dt>
          <dd className="text-grey-100">{detail.url}</dd>

          <dt className="text-grey-90">Type</dt>
          <dd className="text-grey-100">
            {getCatalogingServerTypeLabel(detail.type)}
          </dd>

          <dt className="text-grey-90">Last Updated</dt>
          <dd className="text-grey-100">{detail.updatedAt}</dd>
        </dl>
      </MdUpwardCard>

      <CatalogingServerDeleteModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onDelete={() => navigate("/master-file/tools/cataloging-servers")}
      />
    </PageContainer>
  );
}
