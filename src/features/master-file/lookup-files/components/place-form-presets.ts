import type {
  PlaceFormInitialState,
  PlaceRecord,
} from "@/features/master-file/lookup-files/types/place.types";

export const PLACE_PRESET_RECORDS: PlaceRecord[] = [
  {
    id: "place-1",
    name: "Senayan",
    status: "active",
    updatedAt: "28 Feb 2026",
  },
  {
    id: "place-2",
    name: "Legacy Place",
    status: "orphaned",
    updatedAt: "15 Mar 2026",
  },
];

export const CREATE_PLACE_FORM_INITIAL_STATE: PlaceFormInitialState = {
  name: "",
};

export function getEditPlaceFormInitialState(
  id: string,
): PlaceFormInitialState {
  const preset =
    PLACE_PRESET_RECORDS.find((record) => record.id === id) ??
    PLACE_PRESET_RECORDS[0];

  return {
    name: preset.name,
  };
}
