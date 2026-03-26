import { z } from "zod";

export type ItemCodePatternPresetRecord = {
  id: string;
  name: string;
  prefix: string;
  suffix: string;
  serialLength: string;
  updatedAt: string;
};

export const ITEM_CODE_PATTERN_PRESET_RECORDS: ItemCodePatternPresetRecord[] = [
  {
    id: "item-code-pattern-1",
    name: "P00000S",
    prefix: "P",
    suffix: "S",
    serialLength: "5",
    updatedAt: "28 Feb 2026",
  },
];

export function getItemCodePatternRecordById(
  id: string,
): ItemCodePatternPresetRecord {
  return (
    ITEM_CODE_PATTERN_PRESET_RECORDS.find((record) => record.id === id) ??
    ITEM_CODE_PATTERN_PRESET_RECORDS[0]
  );
}

export const itemCodePatternFormSchema = z.object({
  prefix: z
    .string()
    .trim()
    .min(1, "Prefix wajib diisi")
    .max(20, "Prefix maksimal 20 karakter"),
  suffix: z
    .string()
    .trim()
    .min(1, "Suffix wajib diisi")
    .max(20, "Suffix maksimal 20 karakter"),
  serialLength: z
    .string()
    .trim()
    .min(1, "Length Serial Number wajib diisi")
    .regex(/^\d+$/, "Length Serial Number harus berupa angka")
    .max(10, "Length Serial Number maksimal 10 digit"),
});

export type ItemCodePatternFormData = z.infer<typeof itemCodePatternFormSchema>;
export type ItemCodePatternFormInitialState = ItemCodePatternFormData;

export const CREATE_ITEM_CODE_PATTERN_FORM_INITIAL_STATE: ItemCodePatternFormInitialState =
  {
    prefix: "",
    suffix: "",
    serialLength: "",
  };

export function getEditItemCodePatternFormInitialState(
  id: string,
): ItemCodePatternFormInitialState {
  const preset = getItemCodePatternRecordById(id);

  return {
    prefix: preset.prefix,
    suffix: preset.suffix,
    serialLength: preset.serialLength,
  };
}
