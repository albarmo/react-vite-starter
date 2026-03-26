"use client";

import { BookRequestRejectModal } from "@/features/bibliographic/components/book-request-reject-modal";
import {
  getBookRequestRecordById,
  getBookRequestStatusLabel,
} from "@/features/bibliographic/components/book-request-presets";
import type {
  BookRequestRejectFormValues,
  BookRequestStatus,
} from "@/features/bibliographic/types/book-request.types";
import { PageContainer } from "@/shared/components/common/app-page-container";
import { MdUpwardCard } from "@/shared/components/common/md-upward-card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";
import { Check, Plus, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function getStatusVariant(status: BookRequestStatus) {
  switch (status) {
    case "approved":
      return "green";
    case "rejected":
      return "red";
    case "pending":
    default:
      return "orange";
  }
}

function BookRequestDetailBreadcrumb() {
  return (
    <Breadcrumb className="mt-2">
      <BreadcrumbList className="text-sm text-grey-80">
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="hover:text-blue-50">
            <Link to="/bibliographic/book-requests">Book Request</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-grey-70" />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-medium text-blue-50">
            Book Request Detail
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function BookRequestDetailPage() {
  const navigate = useNavigate();
  const { id = "book-request-1" } = useParams();
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const detail = useMemo(() => getBookRequestRecordById(id), [id]);
  const [status, setStatus] = useState<BookRequestStatus>(detail.status);
  const [reason, setReason] = useState(detail.reason);

  useEffect(() => {
    setStatus(detail.status);
    setReason(detail.reason);
  }, [detail]);

  const isResolved = status !== "pending";
  const isApproved = status === "approved";

  const handleApprove = () => {
    setStatus("approved");
  };

  const handleReject = ({ reason: nextReason }: BookRequestRejectFormValues) => {
    setStatus("rejected");
    setReason(nextReason);
  };

  return (
    <PageContainer className="pt-6 pb-10 md:pt-8">
      <div>
        <h1 className="text-2xl font-medium text-primary">
          Book Request Detail
        </h1>
        <BookRequestDetailBreadcrumb />
      </div>

      <MdUpwardCard className="mt-6 rounded-[18px] p-5">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-xl font-medium text-grey-100">
              Book Request Detail
            </h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              className="text-green-60"
              disabled={isResolved}
              onClick={handleApprove}
            >
              <Check className="size-4" />
              Approve
            </Button>
            <Button
              type="button"
              variant="outline"
              className="text-red-60"
              disabled={isResolved}
              onClick={() => setIsRejectModalOpen(true)}
            >
              <X className="size-4" />
              Reject
            </Button>
          </div>
        </div>

        <dl className="mt-8 grid max-w-135 grid-cols-[110px_minmax(0,1fr)] gap-x-8 gap-y-4">
          <dt className="text-grey-90">Status</dt>
          <dd>
            <Badge variant={getStatusVariant(status)}>
              {getBookRequestStatusLabel(status)}
            </Badge>
          </dd>

          <dt className="text-grey-90">Member ID</dt>
          <dd className="text-grey-100">{detail.memberId}</dd>

          <dt className="text-grey-90">Name</dt>
          <dd className="text-grey-100">{detail.name}</dd>

          <dt className="text-grey-90">Title</dt>
          <dd className="text-grey-100">{detail.title}</dd>

          <dt className="text-grey-90">Penulis</dt>
          <dd className="text-grey-100">{detail.author}</dd>

          <dt className="text-grey-90">ISBN</dt>
          <dd className="text-grey-100">{detail.isbn}</dd>

          <dt className="text-grey-90">Reason</dt>
          <dd className="text-grey-100">{reason || "-"}</dd>
        </dl>

        {isApproved ? (
          <div className="mt-8">
            <Button
              type="button"
              className="h-12 px-5"
              onClick={() => navigate("/bibliographic/create")}
            >
              <Plus className="size-4" />
              Create
            </Button>
            <p className="mt-2 text-base text-grey-70">
              You can add a book if you already have one.
            </p>
          </div>
        ) : null}
      </MdUpwardCard>

      <BookRequestRejectModal
        open={isRejectModalOpen}
        onOpenChange={setIsRejectModalOpen}
        defaultReason={reason === "-" ? "" : reason}
        onReject={handleReject}
      />
    </PageContainer>
  );
}
