import type { PublisherFormInitialState } from "@/features/protected/library/master-file/authority-files/types/publisher.types";

const PUBLISHER_FORM_PRESET_RECORDS = [
  {
    name: "\\'Gramedia",
  },
  {
    name: "Orphan Publisher",
  },
] as const;

export const CREATE_PUBLISHER_FORM_INITIAL_STATE: PublisherFormInitialState = {
  name: "",
};

export function getEditPublisherFormInitialState(
  id: string,
): PublisherFormInitialState {
  const matchedIndex = Number.parseInt(id.replace(/^publisher-/, ""), 10);
  const safeIndex =
    Number.isFinite(matchedIndex) && matchedIndex > 0 ? matchedIndex - 1 : 0;
  const preset =
    PUBLISHER_FORM_PRESET_RECORDS[
      safeIndex % PUBLISHER_FORM_PRESET_RECORDS.length
    ] ?? PUBLISHER_FORM_PRESET_RECORDS[0];

  return { ...preset };
}
