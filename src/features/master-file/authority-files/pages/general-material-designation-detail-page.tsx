"use client";

import { GeneralMaterialDesignationDeleteModal } from "@/features/master-file/authority-files/components/general-material-designation-delete-modal";
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
import type { GeneralMaterialDesignationDetail } from "@/features/master-file/authority-files/types/general-material-designation.types";

const GENERAL_MATERIAL_DESIGNATION_DETAILS: GeneralMaterialDesignationDetail[] =
  [
    {
      id: "gmd-1",
      code: "AR",
      name: "Art Original",
      updatedAt: "28 Feb 2026",
    },
    {
      id: "gmd-2",
      code: "CA",
      name: "Cartographic Material",
      updatedAt: "28 Feb 2026",
    },
    {
      id: "gmd-3",
      code: "CD",
      name: "CD-ROM",
      updatedAt: "31 Mar 2026",
    },
    {
      id: "gmd-4",
      code: "CH",
      name: "Chart",
      updatedAt: "10 Apr 2026",
    },
    {
      id: "gmd-5",
      code: "CF",
      name: "Computer File",
      updatedAt: "30 Apr 2026",
    },
  ];

function GeneralMaterialDesignationDetailBreadcrumb() {
  return (
    <Breadcrumb className="mt-2">
      <BreadcrumbList className="text-sm text-grey-80">
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="hover:text-blue-50">
            <Link to="/master-file/authority-files/gmd">GMD</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-grey-70" />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-medium text-blue-50">
            GMD Detail
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function GeneralMaterialDesignationDetailPage() {
  const navigate = useNavigate();
  const { id = "gmd-2" } = useParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const detail = useMemo(
    () =>
      GENERAL_MATERIAL_DESIGNATION_DETAILS.find((item) => item.id === id) ??
      GENERAL_MATERIAL_DESIGNATION_DETAILS[1],
    [id],
  );

  return (
    <PageContainer className="pt-6 pb-10 md:pt-8">
      <div>
        <h1 className="text-2xl font-medium text-primary">GMD Detail</h1>
        <GeneralMaterialDesignationDetailBreadcrumb />
      </div>

      <MdUpwardCard className="mt-6 rounded-[18px] p-5">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-xl font-medium text-grey-100">GMD Detail</h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                navigate(`/master-file/authority-files/gmd/edit/${detail.id}`)
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
          <dt className="text-grey-90">Code</dt>
          <dd className="text-grey-100">{detail.code}</dd>

          <dt className="text-grey-90">Name</dt>
          <dd className="text-grey-100">{detail.name}</dd>

          <dt className="text-grey-90">Last Updated</dt>
          <dd className="text-grey-100">{detail.updatedAt}</dd>
        </dl>
      </MdUpwardCard>

      <GeneralMaterialDesignationDeleteModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onDelete={() => navigate("/master-file/authority-files/gmd")}
      />
    </PageContainer>
  );
}
