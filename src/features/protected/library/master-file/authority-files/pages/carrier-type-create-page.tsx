"use client";

import { CarrierTypeForm } from "@/features/protected/library/master-file/authority-files/components/carrier-type-form";
import { CREATE_CARRIER_TYPE_FORM_INITIAL_STATE } from "@/features/protected/library/master-file/authority-files/components/carrier-type-form-presets";

export function CarrierTypeCreatePage() {
  return (
    <CarrierTypeForm
      mode="create"
      pageTitle="Create Carrier Type"
      initialState={CREATE_CARRIER_TYPE_FORM_INITIAL_STATE}
    />
  );
}
