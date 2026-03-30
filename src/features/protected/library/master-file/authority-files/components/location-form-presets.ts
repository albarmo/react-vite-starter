import type { LocationFormInitialState } from "@/features/protected/library/master-file/authority-files/types/location.types";

const LOCATION_FORM_PRESET_RECORDS = [
  {
    code: "SL",
    name: "My Library",
  },
  {
    code: "ORP",
    name: "Orphaned Location",
  },
] as const;

export const CREATE_LOCATION_FORM_INITIAL_STATE: LocationFormInitialState = {
  code: "",
  name: "",
};

export function getEditLocationFormInitialState(
  id: string,
): LocationFormInitialState {
  const matchedIndex = Number.parseInt(id.replace(/^location-/, ""), 10);
  const safeIndex =
    Number.isFinite(matchedIndex) && matchedIndex > 0 ? matchedIndex - 1 : 0;
  const preset =
    LOCATION_FORM_PRESET_RECORDS[
      safeIndex % LOCATION_FORM_PRESET_RECORDS.length
    ] ?? LOCATION_FORM_PRESET_RECORDS[0];

  return { ...preset };
}
