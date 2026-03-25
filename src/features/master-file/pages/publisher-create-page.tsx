"use client";

import { PublisherForm } from "@/features/master-file/components/publisher-form";
import { CREATE_PUBLISHER_FORM_INITIAL_STATE } from "@/features/master-file/components/publisher-form-presets";

export function PublisherCreatePage() {
  return (
    <PublisherForm
      mode="create"
      pageTitle="Create Publisher"
      initialState={CREATE_PUBLISHER_FORM_INITIAL_STATE}
    />
  );
}
