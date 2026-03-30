"use client";

import { DocLanguageForm } from "@/features/protected/library/master-file/lookup-files/components/doc-language-form";
import { getEditDocLanguageFormInitialState } from "@/features/protected/library/master-file/lookup-files/components/doc-language-form-presets";
import { useParams } from "react-router-dom";

export function DocLanguageEditPage() {
  const { id = "doc-language-1" } = useParams();

  return (
    <DocLanguageForm
      mode="edit"
      pageTitle="Edit Doc. Language"
      initialState={getEditDocLanguageFormInitialState(id)}
      recordId={id}
    />
  );
}
