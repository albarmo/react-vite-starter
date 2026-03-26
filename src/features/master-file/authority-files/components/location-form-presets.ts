import { z } from "zod";

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

export const locationFormSchema = z.object({
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

export type LocationFormData = z.infer<typeof locationFormSchema>;
export type LocationFormInitialState = LocationFormData;

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
    LOCATION_FORM_PRESET_RECORDS[safeIndex % LOCATION_FORM_PRESET_RECORDS.length] ??
    LOCATION_FORM_PRESET_RECORDS[0];

  return { ...preset };
}
