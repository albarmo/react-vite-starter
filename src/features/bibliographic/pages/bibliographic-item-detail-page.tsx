"use client";

import { BibliographicDeleteModal } from "@/features/bibliographic/components/bibliographic-delete-modal";
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

type ItemDetailField = {
  label: string;
  value: string;
};

type ItemDetailRecord = {
  id: string;
  bibliographicId: string;
  itemCode: string;
  title: string;
  fields: ItemDetailField[];
};

const DEFAULT_ITEM_DETAIL: ItemDetailRecord = {
  id: "item-1",
  bibliographicId: "book-10",
  itemCode: "P00020S",
  title: "The Let Them Theory",
  fields: [
    { label: "Title", value: "The Let Them Theory" },
    { label: "Item Code", value: "P00020S" },
    { label: "Inventory Code", value: "-" },
    { label: "Location", value: "My Library" },
    { label: "Shelf Location", value: "-" },
    { label: "Collection Type", value: "Textbook" },
    { label: "Item Status", value: "Available" },
    { label: "Order Number", value: "-" },
    { label: "Order Date", value: "16 Mar 2026" },
    { label: "Receiving Date", value: "16 Mar 2026" },
    { label: "Supplier", value: "-" },
    { label: "Source", value: "Buy" },
    { label: "Invoice", value: "-" },
    { label: "Invoice Date", value: "16 Mar 2026" },
    { label: "Price", value: "-" },
  ],
};

const ITEM_DETAIL_BY_ID: Record<string, ItemDetailRecord> = {
  "item-1": DEFAULT_ITEM_DETAIL,
  "item-2": {
    ...DEFAULT_ITEM_DETAIL,
    id: "item-2",
    itemCode: "P00012S",
    fields: DEFAULT_ITEM_DETAIL.fields.map((field) =>
      field.label === "Item Code" ? { ...field, value: "P00012S" } : field,
    ),
  },
  "item-3": {
    ...DEFAULT_ITEM_DETAIL,
    id: "item-3",
    itemCode: "P00013S",
    fields: DEFAULT_ITEM_DETAIL.fields.map((field) =>
      field.label === "Item Code" ? { ...field, value: "P00013S" } : field,
    ),
  },
};

function ItemDetailBreadcrumb() {
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
            Item Detail
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function DetailField({ label, value }: ItemDetailField) {
  return (
    <>
      <dt className="text-grey-90">{label}</dt>
      <dd className="min-h-7 text-grey-100">{value}</dd>
    </>
  );
}

export function BibliographicItemDetailPage() {
  const navigate = useNavigate();
  const { id = "item-1" } = useParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const itemDetail = useMemo(
    () => ITEM_DETAIL_BY_ID[id] ?? DEFAULT_ITEM_DETAIL,
    [id],
  );

  return (
    <PageContainer className="pt-6 pb-10 md:pt-8">
      <div>
        <h1 className="text-2xl font-medium text-primary">Item Detail</h1>
        <ItemDetailBreadcrumb />
      </div>

      <MdUpwardCard className="mt-6 rounded-[18px] p-4 md:p-5">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <h2 className="text-xl font-medium text-grey-100">Item Detail</h2>

          <div className="flex flex-wrap items-center gap-3">
            <Button type="button" variant="outline" asChild>
              <Link to={`/bibliographic/item/edit/${itemDetail.id}`}>
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

        <dl className="grid gap-x-8 gap-y-3 md:grid-cols-[210px_minmax(0,1fr)]">
          {itemDetail.fields.map((field) => (
            <DetailField key={field.label} {...field} />
          ))}
        </dl>
      </MdUpwardCard>

      <BibliographicDeleteModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onDelete={() => navigate("/bibliographic/list")}
        title="Delete Item"
        description={
          <>
            Are you sure you want to delete item{" "}
            <span className="font-medium text-grey-80">
              {itemDetail.itemCode}
            </span>
            ?
          </>
        }
      />
    </PageContainer>
  );
}
