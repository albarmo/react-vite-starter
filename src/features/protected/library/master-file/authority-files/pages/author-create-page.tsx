"use client";

import { AuthorForm } from "@/features/protected/library/master-file/authority-files/components/author-form";
import { CREATE_AUTHOR_FORM_INITIAL_STATE } from "@/features/protected/library/master-file/authority-files/components/author-form-presets";

export function AuthorCreatePage() {
  return (
    <AuthorForm
      mode="create"
      pageTitle="Create Author"
      initialState={CREATE_AUTHOR_FORM_INITIAL_STATE}
    />
  );
}
