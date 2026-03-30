"use client";

import { ContentTypeForm } from "@/features/protected/library/master-file/authority-files/components/content-type-form";
import { getEditContentTypeFormInitialState } from "@/features/protected/library/master-file/authority-files/components/content-type-form-presets";
import { useParams } from "react-router-dom";

export function ContentTypeEditPage() {
  const { id = "" } = useParams();

  return (
    <ContentTypeForm
      mode="edit"
      pageTitle="Edit Content Type"
      initialState={getEditContentTypeFormInitialState(id)}
      recordId={id}
    />
  );
}
