"use client";

import { DocLanguageForm } from "@/features/protected/library/master-file/lookup-files/components/doc-language-form";
import { CREATE_DOC_LANGUAGE_FORM_INITIAL_STATE } from "@/features/protected/library/master-file/lookup-files/components/doc-language-form-presets";

export function DocLanguageCreatePage() {
  return (
    <DocLanguageForm
      mode="create"
      pageTitle="Create Doc. Language"
      initialState={CREATE_DOC_LANGUAGE_FORM_INITIAL_STATE}
    />
  );
}
