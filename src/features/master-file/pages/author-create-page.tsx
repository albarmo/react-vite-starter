"use client";

import { AuthorForm } from "@/features/master-file/components/author-form";
import { CREATE_AUTHOR_FORM_INITIAL_STATE } from "@/features/master-file/components/author-form-presets";

export function AuthorCreatePage() {
  return (
    <AuthorForm
      mode="create"
      pageTitle="Create Author"
      initialState={CREATE_AUTHOR_FORM_INITIAL_STATE}
    />
  );
}
