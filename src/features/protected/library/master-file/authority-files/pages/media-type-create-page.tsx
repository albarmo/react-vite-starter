"use client";

import { MediaTypeForm } from "@/features/protected/library/master-file/authority-files/components/media-type-form";
import { CREATE_MEDIA_TYPE_FORM_INITIAL_STATE } from "@/features/protected/library/master-file/authority-files/components/media-type-form-presets";

export function MediaTypeCreatePage() {
  return (
    <MediaTypeForm
      mode="create"
      pageTitle="Create Media Type"
      initialState={CREATE_MEDIA_TYPE_FORM_INITIAL_STATE}
    />
  );
}
