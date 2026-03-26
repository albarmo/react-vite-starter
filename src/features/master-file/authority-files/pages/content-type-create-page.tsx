"use client";

import { ContentTypeForm } from "@/features/master-file/authority-files/components/content-type-form";
import { CREATE_CONTENT_TYPE_FORM_INITIAL_STATE } from "@/features/master-file/authority-files/components/content-type-form-presets";

export function ContentTypeCreatePage() {
  return (
    <ContentTypeForm
      mode="create"
      pageTitle="Create Content Type"
      initialState={CREATE_CONTENT_TYPE_FORM_INITIAL_STATE}
    />
  );
}
