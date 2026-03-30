"use client";

import { CrossReferenceForm } from "@/features/protected/library/master-file/authority-files/components/cross-reference-form";
import { CREATE_CROSS_REFERENCE_FORM_INITIAL_STATE } from "@/features/protected/library/master-file/authority-files/components/cross-reference-form-presets";

export function CrossReferenceCreatePage() {
  return (
    <CrossReferenceForm
      mode="create"
      pageTitle="Create Cross Reference"
      initialState={CREATE_CROSS_REFERENCE_FORM_INITIAL_STATE}
    />
  );
}
