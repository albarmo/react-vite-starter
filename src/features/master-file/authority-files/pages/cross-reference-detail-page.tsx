"use client";

import { CrossReferenceDeleteModal } from "@/features/master-file/authority-files/components/cross-reference-delete-modal";
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

type CrossReferenceDetail = {
  id: string;
  code: string;
  description: string;
};

const CROSS_REFERENCE_PRESETS: Omit<CrossReferenceDetail, "id">[] = [
  {
    code: "BT",
    description: "Broader Term",
  },
  {
    code: "NT",
    description: "Narrower Term",
  },
  {
    code: "RT",
    description: "Related Term",
  },
  {
    code: "SA",
    description: "Related Term",
  },
  {
    code: "U",
    description: "Use",
  },
  {
    code: "UF",
    description: "Use For",
  },
];

function CrossReferenceDetailBreadcrumb() {
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
            Cross Reference Detail
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function CrossReferenceDetailPage() {
  const navigate = useNavigate();
  const { id = "cross-reference-1" } = useParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const detail = useMemo(() => {
    const matchedIndex = Number.parseInt(
      id.replace(/^cross-reference-/, ""),
      10,
    );
    const safeIndex =
      Number.isFinite(matchedIndex) && matchedIndex > 0 ? matchedIndex - 1 : 0;
    const preset =
      CROSS_REFERENCE_PRESETS[safeIndex % CROSS_REFERENCE_PRESETS.length] ??
      CROSS_REFERENCE_PRESETS[0];

    return {
      id,
      ...preset,
    };
  }, [id]);

  return (
    <PageContainer className="pt-6 pb-10 md:pt-8">
      <div>
        <h1 className="text-2xl font-medium text-primary">
          Cross Reference Detail
        </h1>
        <CrossReferenceDetailBreadcrumb />
      </div>

      <MdUpwardCard className="mt-6 rounded-[18px] p-5">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-xl font-medium text-grey-100">
              Cross Reference Detail
            </h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              className="h-11 px-6"
              onClick={() =>
                navigate(
                  `/master-file/authority-files/subject/cross-reference/edit/${detail.id}`,
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

        <dl className="mt-8 grid max-w-120 grid-cols-[104px_minmax(0,1fr)] gap-x-8 gap-y-4">
          <dt className="text-grey-90">Code</dt>
          <dd className="text-grey-100">{detail.code}</dd>

          <dt className="text-grey-90">Description</dt>
          <dd className="text-grey-100">{detail.description}</dd>
        </dl>
      </MdUpwardCard>

      <CrossReferenceDeleteModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onDelete={() => navigate("/master-file/authority-files/subject")}
      />
    </PageContainer>
  );
}
