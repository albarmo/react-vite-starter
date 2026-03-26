"use client";

import { LabelForm } from "@/features/master-file/lookup-files/components/label-form";
import { CREATE_LABEL_FORM_INITIAL_STATE } from "@/features/master-file/lookup-files/components/label-form-presets";

export function LabelCreatePage() {
  return (
    <LabelForm
      key="create-label"
      mode="create"
      pageTitle="Create Label"
      initialState={CREATE_LABEL_FORM_INITIAL_STATE}
    />
  );
}
