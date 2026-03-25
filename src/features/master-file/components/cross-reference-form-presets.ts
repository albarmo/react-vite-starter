import { z } from "zod";

const CROSS_REFERENCE_FORM_PRESET_RECORDS = [
  {
    code: "BT",
    description: "Broader Term",
  },
  {
    code: "NT",
    description: "Narrower Term",
  },
  {
    code: "RT",
    description: "Related Term",
  },
  {
    code: "SA",
    description: "Related Term",
  },
  {
    code: "U",
    description: "Use",
  },
  {
    code: "UF",
    description: "Use For",
  },
] as const;

export const crossReferenceFormSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, "Code wajib diisi")
    .max(20, "Code maksimal 20 karakter")
    .regex(/^[A-Za-z0-9-]+$/, "Code hanya boleh huruf, angka, dan tanda hubung"),
  description: z
    .string()
    .trim()
    .min(1, "Description wajib diisi")
    .max(400, "Description maksimal 400 karakter"),
});

export type CrossReferenceFormData = z.infer<typeof crossReferenceFormSchema>;
export type CrossReferenceFormInitialState = CrossReferenceFormData;

export const CREATE_CROSS_REFERENCE_FORM_INITIAL_STATE: CrossReferenceFormInitialState =
  {
    code: "",
    description: "",
  };

export function getEditCrossReferenceFormInitialState(
  id: string,
): CrossReferenceFormInitialState {
  const matchedIndex = Number.parseInt(id.replace(/^cross-reference-/, ""), 10);
  const safeIndex =
    Number.isFinite(matchedIndex) && matchedIndex > 0 ? matchedIndex - 1 : 0;
  const preset =
    CROSS_REFERENCE_FORM_PRESET_RECORDS[
      safeIndex % CROSS_REFERENCE_FORM_PRESET_RECORDS.length
    ] ?? CROSS_REFERENCE_FORM_PRESET_RECORDS[0];

  return { ...preset };
}
