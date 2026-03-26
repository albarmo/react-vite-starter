"use client";

import { PageContainer } from "@/shared/components/common/app-page-container";
import { AppPageHeader } from "@/shared/components/common/app-page-header";
import { MdUpwardCard } from "@/shared/components/common/md-upward-card";
import { Navigate, useLocation } from "react-router-dom";

const LOOKUP_FILE_TITLE_MAP: Record<string, string> = {
  "item-status": "Item Status",
  "collection-type": "Collection Type",
  "doc-language": "Doc. Language",
  "label": "Label",
  "frequency": "Frequency",
};

export default function LookupFilesPage() {
  const location = useLocation();

  if (location.pathname === "/master-file/look-up-files") {
    return <Navigate to="/master-file/look-up-files/place" replace />;
  }

  const slug = location.pathname.split("/")[3] ?? "look-up-files";
  const title = LOOKUP_FILE_TITLE_MAP[slug] ?? "Look Up Files";

  return (
    <PageContainer className="pb-10">
      <AppPageHeader title={title} />

      <MdUpwardCard className="mt-5">
        <div className="rounded-md border border-dashed border-grey-40 bg-grey-10/60 px-5 py-10 text-center text-base text-grey-80">
          This page is coming soon.
        </div>
      </MdUpwardCard>
    </PageContainer>
  );
}
