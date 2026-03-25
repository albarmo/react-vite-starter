"use client";

import { SubjectForm } from "@/features/master-file/components/subject-form";
import { CREATE_SUBJECT_FORM_INITIAL_STATE } from "@/features/master-file/components/subject-form-presets";

export function SubjectCreatePage() {
  return (
    <SubjectForm
      mode="create"
      pageTitle="Create Subject"
      initialState={CREATE_SUBJECT_FORM_INITIAL_STATE}
    />
  );
}
