"use client";

import { PlaceForm } from "@/features/protected/library/master-file/lookup-files/components/place-form";
import { getEditPlaceFormInitialState } from "@/features/protected/library/master-file/lookup-files/components/place-form-presets";
import { useParams } from "react-router-dom";

export function PlaceEditPage() {
  const { id = "place-1" } = useParams();

  return (
    <PlaceForm
      mode="edit"
      pageTitle="Edit Place"
      initialState={getEditPlaceFormInitialState(id)}
      recordId={id}
    />
  );
}
