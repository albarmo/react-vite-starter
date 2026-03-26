import type {
  ItemCodePatternFormInitialState,
  ItemCodePatternRecord,
} from "@/features/master-file/tools/types/item-code-pattern.types";

export const ITEM_CODE_PATTERN_PRESET_RECORDS: ItemCodePatternRecord[] = [
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
): ItemCodePatternRecord {
  return (
    ITEM_CODE_PATTERN_PRESET_RECORDS.find((record) => record.id === id) ??
    ITEM_CODE_PATTERN_PRESET_RECORDS[0]
  );
}

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
