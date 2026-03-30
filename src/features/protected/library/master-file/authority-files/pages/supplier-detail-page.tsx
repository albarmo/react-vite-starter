"use client";

import { SupplierDeleteModal } from "@/features/protected/library/master-file/authority-files/components/supplier-delete-modal";
import type { SupplierDetail } from "@/features/protected/library/master-file/authority-files/types/supplier.types";
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

const SUPPLIER_DETAILS: SupplierDetail[] = [
  {
    id: "supplier-1",
    name: "Gramedia",
    address: "Jalan Abuserin III",
    contact: "Mariyanto",
    phoneNumber: "081234567890",
    faxNumber: "081234567890",
    accountNumber: "081234567890",
    updatedAt: "28 Feb 2026",
  },
];

function SupplierDetailBreadcrumb() {
  return (
    <Breadcrumb className="mt-2">
      <BreadcrumbList className="text-sm text-grey-80">
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="hover:text-blue-50">
            <Link to="/master-file/authority-files/supplier">Supplier</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-grey-70" />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-medium text-blue-50">
            Supplier Detail
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function SupplierDetailPage() {
  const navigate = useNavigate();
  const { id = "supplier-1" } = useParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const detail = useMemo(
    () =>
      SUPPLIER_DETAILS.find((item) => item.id === id) ?? SUPPLIER_DETAILS[0],
    [id],
  );

  return (
    <PageContainer className="pt-6 pb-10 md:pt-8">
      <div>
        <h1 className="text-2xl font-medium text-primary">Supplier Detail</h1>
        <SupplierDetailBreadcrumb />
      </div>

      <MdUpwardCard className="mt-6 rounded-[18px] p-5">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-xl font-medium text-grey-100">
              Supplier Detail
            </h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                navigate(
                  `/master-file/authority-files/supplier/edit/${detail.id}`,
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

        <dl className="mt-8 grid max-w-140 grid-cols-[130px_minmax(0,1fr)] gap-x-8 gap-y-4">
          <dt className="text-grey-90">Name</dt>
          <dd className="text-grey-100">{detail.name}</dd>

          <dt className="text-grey-90">Address</dt>
          <dd className="text-grey-100">{detail.address}</dd>

          <dt className="text-grey-90">Contact Person</dt>
          <dd className="text-grey-100">{detail.contact}</dd>

          <dt className="text-grey-90">Phone Number</dt>
          <dd className="text-grey-100">{detail.phoneNumber}</dd>

          <dt className="text-grey-90">Fax Number</dt>
          <dd className="text-grey-100">{detail.faxNumber}</dd>

          <dt className="text-grey-90">Account Number</dt>
          <dd className="text-grey-100">{detail.accountNumber}</dd>

          <dt className="text-grey-90">Last Updated</dt>
          <dd className="text-grey-100">{detail.updatedAt}</dd>
        </dl>
      </MdUpwardCard>

      <SupplierDeleteModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onDelete={() => navigate("/master-file/authority-files/supplier")}
      />
    </PageContainer>
  );
}
