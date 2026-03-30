"use client";

import { LabelForm } from "@/features/protected/library/master-file/lookup-files/components/label-form";
import { getEditLabelFormInitialState } from "@/features/protected/library/master-file/lookup-files/components/label-form-presets";
import { useParams } from "react-router-dom";

export function LabelEditPage() {
  const { id = "label-1" } = useParams();

  return (
    <LabelForm
      key={`edit-label-${id}`}
      mode="edit"
      pageTitle="Edit Label"
      initialState={getEditLabelFormInitialState(id)}
      recordId={id}
    />
  );
}
