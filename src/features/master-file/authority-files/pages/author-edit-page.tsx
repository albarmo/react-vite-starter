"use client";

import { AuthorForm } from "@/features/master-file/authority-files/components/author-form";
import { getEditAuthorFormInitialState } from "@/features/master-file/authority-files/components/author-form-presets";
import { useParams } from "react-router-dom";

export function AuthorEditPage() {
  const { id = "" } = useParams();

  return (
    <AuthorForm
      mode="edit"
      pageTitle="Edit Author"
      initialState={getEditAuthorFormInitialState(id)}
    />
  );
}
