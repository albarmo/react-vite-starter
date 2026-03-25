"use client";

import {
  BibliographicForm,
} from "@/features/bibliographic/components/bibliographic-form";
import { CREATE_BIBLIOGRAPHIC_FORM_INITIAL_STATE } from "@/features/bibliographic/components/bibliographic-form-presets";

export function BibliographicCreatePage() {
  return (
    <BibliographicForm
      pageTitle="Create Bibliography"
      initialState={CREATE_BIBLIOGRAPHIC_FORM_INITIAL_STATE}
    />
  );
}
