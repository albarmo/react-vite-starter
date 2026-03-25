"use client";

import { SubjectForm } from "@/features/master-file/components/subject-form";
import { getEditSubjectFormInitialState } from "@/features/master-file/components/subject-form-presets";
import { useParams } from "react-router-dom";

export function SubjectEditPage() {
  const { id = "" } = useParams();

  return (
    <SubjectForm
      mode="edit"
      pageTitle="Edit Subject"
      initialState={getEditSubjectFormInitialState(id)}
      recordId={id}
    />
  );
}
