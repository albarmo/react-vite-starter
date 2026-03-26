"use client";

import { PlaceForm } from "@/features/master-file/lookup-files/components/place-form";
import { CREATE_PLACE_FORM_INITIAL_STATE } from "@/features/master-file/lookup-files/components/place-form-presets";

export function PlaceCreatePage() {
  return (
    <PlaceForm
      mode="create"
      pageTitle="Create Place"
      initialState={CREATE_PLACE_FORM_INITIAL_STATE}
    />
  );
}
