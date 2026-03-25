"use client";

import { PlaceForm } from "@/features/master-file/components/place-form";
import { getEditPlaceFormInitialState } from "@/features/master-file/components/place-form-presets";
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
