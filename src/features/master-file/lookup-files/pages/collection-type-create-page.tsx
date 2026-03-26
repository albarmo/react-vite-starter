"use client";

import { CollectionTypeForm } from "@/features/master-file/lookup-files/components/collection-type-form";
import { CREATE_COLLECTION_TYPE_FORM_INITIAL_STATE } from "@/features/master-file/lookup-files/components/collection-type-form-presets";

export function CollectionTypeCreatePage() {
  return (
    <CollectionTypeForm
      mode="create"
      pageTitle="Create Collection Type"
      initialState={CREATE_COLLECTION_TYPE_FORM_INITIAL_STATE}
    />
  );
}
