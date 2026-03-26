"use client";

import { CarrierTypeForm } from "@/features/master-file/authority-files/components/carrier-type-form";
import { getEditCarrierTypeFormInitialState } from "@/features/master-file/authority-files/components/carrier-type-form-presets";
import { useParams } from "react-router-dom";

export function CarrierTypeEditPage() {
  const { id = "" } = useParams();

  return (
    <CarrierTypeForm
      mode="edit"
      pageTitle="Edit Carrier Type"
      initialState={getEditCarrierTypeFormInitialState(id)}
    />
  );
}
