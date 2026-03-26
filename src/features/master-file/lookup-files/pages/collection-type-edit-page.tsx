"use client";

import { CollectionTypeForm } from "@/features/master-file/lookup-files/components/collection-type-form";
import { getEditCollectionTypeFormInitialState } from "@/features/master-file/lookup-files/components/collection-type-form-presets";
import { useParams } from "react-router-dom";

export function CollectionTypeEditPage() {
  const { id = "collection-type-1" } = useParams();

  return (
    <CollectionTypeForm
      mode="edit"
      pageTitle="Edit Collection Type"
      initialState={getEditCollectionTypeFormInitialState(id)}
      recordId={id}
    />
  );
}
