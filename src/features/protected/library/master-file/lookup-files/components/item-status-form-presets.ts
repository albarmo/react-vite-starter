import type {
  ItemStatusFormInitialState,
  ItemStatusRecord,
  ItemStatusRuleKey,
} from "@/features/protected/library/master-file/lookup-files/types/item-status.types";

export const ITEM_STATUS_RULE_OPTIONS = [
  {
    value: "no-loan-transaction",
    label: "No Loan Transaction",
  },
  {
    value: "skipped-by-stock-take",
    label: "Skipped By Stock Take",
  },
] as const;

export const ITEM_STATUS_PRESET_RECORDS: ItemStatusRecord[] = [
  {
    id: "item-status-1",
    code: "MIS",
    name: "Missing",
    rules: [],
    updatedAt: "28 Feb 2026",
  },
  {
    id: "item-status-2",
    code: "NL",
    name: "No Loan",
    rules: ["no-loan-transaction", "skipped-by-stock-take"],
    updatedAt: "28 Feb 2026",
  },
  {
    id: "item-status-3",
    code: "R",
    name: "Repair",
    rules: [],
    updatedAt: "28 Feb 2026",
  },
];

export const CREATE_ITEM_STATUS_FORM_INITIAL_STATE: ItemStatusFormInitialState =
  {
    code: "",
    name: "",
    rules: [],
  };

export function getEditItemStatusFormInitialState(
  id: string,
): ItemStatusFormInitialState {
  const preset =
    ITEM_STATUS_PRESET_RECORDS.find((record) => record.id === id) ??
    ITEM_STATUS_PRESET_RECORDS[0];

  return {
    code: preset.code,
    name: preset.name,
    rules: [...preset.rules],
  };
}

export function getItemStatusRuleLabel(rule: ItemStatusRuleKey) {
  return (
    ITEM_STATUS_RULE_OPTIONS.find((option) => option.value === rule)?.label ??
    rule
  );
}

export function formatItemStatusRules(rules: ItemStatusRuleKey[]) {
  if (rules.length === 0) {
    return "-";
  }

  return rules.map((rule) => getItemStatusRuleLabel(rule)).join(", ");
}
