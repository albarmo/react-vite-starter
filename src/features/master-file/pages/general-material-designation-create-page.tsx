"use client";

import { GeneralMaterialDesignationForm } from "@/features/master-file/components/general-material-designation-form";
import { CREATE_GENERAL_MATERIAL_DESIGNATION_FORM_INITIAL_STATE } from "@/features/master-file/components/general-material-designation-form-presets";

export function GeneralMaterialDesignationCreatePage() {
  return (
    <GeneralMaterialDesignationForm
      mode="create"
      pageTitle="Create GMD"
      initialState={CREATE_GENERAL_MATERIAL_DESIGNATION_FORM_INITIAL_STATE}
    />
  );
}
