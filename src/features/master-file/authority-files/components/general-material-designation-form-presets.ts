import type { GeneralMaterialDesignationFormInitialState } from "@/features/master-file/authority-files/types/general-material-designation.types";

export const CREATE_GENERAL_MATERIAL_DESIGNATION_FORM_INITIAL_STATE: GeneralMaterialDesignationFormInitialState =
  {
    code: "AR",
    name: "Art Original",
  };

const EDIT_GENERAL_MATERIAL_DESIGNATION_FORM_INITIAL_STATE_BY_ID: Record<
  string,
  GeneralMaterialDesignationFormInitialState
> = {
  "gmd-1": {
    code: "AR",
    name: "Art Original",
  },
  "gmd-2": {
    code: "CA",
    name: "Cartographic Material",
  },
  "gmd-3": {
    code: "CD",
    name: "CD-ROM",
  },
  "gmd-4": {
    code: "CH",
    name: "Chart",
  },
  "gmd-5": {
    code: "CF",
    name: "Computer File",
  },
};

export function getEditGeneralMaterialDesignationFormInitialState(
  id: string,
): GeneralMaterialDesignationFormInitialState {
  const initialState =
    EDIT_GENERAL_MATERIAL_DESIGNATION_FORM_INITIAL_STATE_BY_ID[id] ??
    EDIT_GENERAL_MATERIAL_DESIGNATION_FORM_INITIAL_STATE_BY_ID["gmd-1"];

  return { ...initialState };
}
