"use client";

import { CrossReferenceForm } from "@/features/master-file/authority-files/components/cross-reference-form";
import { getEditCrossReferenceFormInitialState } from "@/features/master-file/authority-files/components/cross-reference-form-presets";
import { useParams } from "react-router-dom";

export function CrossReferenceEditPage() {
  const { id = "" } = useParams();

  return (
    <CrossReferenceForm
      mode="edit"
      pageTitle="Edit Cross Reference"
      initialState={getEditCrossReferenceFormInitialState(id)}
      recordId={id}
    />
  );
}
