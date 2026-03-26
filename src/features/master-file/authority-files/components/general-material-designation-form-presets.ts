import { z } from "zod";

export const generalMaterialDesignationFormSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, "Code wajib diisi")
    .max(20, "Code maksimal 20 karakter")
    .regex(/^[A-Za-z0-9-]+$/, "Code hanya boleh huruf, angka, dan tanda hubung"),
  name: z
    .string()
    .trim()
    .min(1, "Name wajib diisi")
    .max(120, "Name maksimal 120 karakter"),
});

export type GeneralMaterialDesignationFormData = z.infer<
  typeof generalMaterialDesignationFormSchema
>;
export type GeneralMaterialDesignationFormInitialState =
  GeneralMaterialDesignationFormData;

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
