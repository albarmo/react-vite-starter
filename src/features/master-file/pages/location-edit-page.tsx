"use client";

import { LocationForm } from "@/features/master-file/components/location-form";
import { getEditLocationFormInitialState } from "@/features/master-file/components/location-form-presets";
import { useParams } from "react-router-dom";

export function LocationEditPage() {
  const { id = "location-1" } = useParams();

  return (
    <LocationForm
      mode="edit"
      pageTitle="Edit Location"
      recordId={id}
      initialState={getEditLocationFormInitialState(id)}
    />
  );
}
