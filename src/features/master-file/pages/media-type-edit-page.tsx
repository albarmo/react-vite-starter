"use client";

import { MediaTypeForm } from "@/features/master-file/components/media-type-form";
import { getEditMediaTypeFormInitialState } from "@/features/master-file/components/media-type-form-presets";
import { useParams } from "react-router-dom";

export function MediaTypeEditPage() {
  const { id = "" } = useParams();

  return (
    <MediaTypeForm
      mode="edit"
      pageTitle="Edit Media Type"
      initialState={getEditMediaTypeFormInitialState(id)}
    />
  );
}
