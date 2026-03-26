import { z } from "zod";

export type PlaceStatus = "active" | "orphaned";

export type PlacePresetRecord = {
  id: string;
  name: string;
  status: PlaceStatus;
  updatedAt: string;
};

export const PLACE_PRESET_RECORDS: PlacePresetRecord[] = [
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

export const placeFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name wajib diisi")
    .max(120, "Name maksimal 120 karakter"),
});

export type PlaceFormData = z.infer<typeof placeFormSchema>;
export type PlaceFormInitialState = PlaceFormData;

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
