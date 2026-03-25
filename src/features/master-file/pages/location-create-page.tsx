"use client";

import { LocationForm } from "@/features/master-file/components/location-form";
import { CREATE_LOCATION_FORM_INITIAL_STATE } from "@/features/master-file/components/location-form-presets";

export function LocationCreatePage() {
  return (
    <LocationForm
      mode="create"
      pageTitle="Create Location"
      initialState={CREATE_LOCATION_FORM_INITIAL_STATE}
    />
  );
}
