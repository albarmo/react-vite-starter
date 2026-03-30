"use client";

import { PublisherForm } from "@/features/protected/library/master-file/authority-files/components/publisher-form";
import { CREATE_PUBLISHER_FORM_INITIAL_STATE } from "@/features/protected/library/master-file/authority-files/components/publisher-form-presets";

export function PublisherCreatePage() {
  return (
    <PublisherForm
      mode="create"
      pageTitle="Create Publisher"
      initialState={CREATE_PUBLISHER_FORM_INITIAL_STATE}
    />
  );
}
