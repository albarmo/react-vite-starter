"use client";

import { GeneralMaterialDesignationForm } from "@/features/master-file/components/general-material-designation-form";
import { getEditGeneralMaterialDesignationFormInitialState } from "@/features/master-file/components/general-material-designation-form-presets";
import { useParams } from "react-router-dom";

export function GeneralMaterialDesignationEditPage() {
  const { id = "gmd-1" } = useParams();

  return (
    <GeneralMaterialDesignationForm
      mode="edit"
      pageTitle="Edit GMD"
      recordId={id}
      initialState={getEditGeneralMaterialDesignationFormInitialState(id)}
    />
  );
}
