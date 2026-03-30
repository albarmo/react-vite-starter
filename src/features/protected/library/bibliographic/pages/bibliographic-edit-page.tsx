"use client";

import { BibliographicForm } from "@/features/protected/library/bibliographic/components/bibliographic-form";
import { EDIT_BIBLIOGRAPHIC_FORM_INITIAL_STATE } from "@/features/protected/library/bibliographic/components/bibliographic-form-presets";

export function BibliographicEditPage() {
  return (
    <BibliographicForm
      pageTitle="Edit Bibliography"
      initialState={EDIT_BIBLIOGRAPHIC_FORM_INITIAL_STATE}
    />
  );
}
