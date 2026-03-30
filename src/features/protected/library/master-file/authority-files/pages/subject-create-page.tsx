"use client";

import { SubjectForm } from "@/features/protected/library/master-file/authority-files/components/subject-form";
import { CREATE_SUBJECT_FORM_INITIAL_STATE } from "@/features/protected/library/master-file/authority-files/components/subject-form-presets";

export function SubjectCreatePage() {
  return (
    <SubjectForm
      mode="create"
      pageTitle="Create Subject"
      initialState={CREATE_SUBJECT_FORM_INITIAL_STATE}
    />
  );
}
