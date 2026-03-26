import { z } from "zod";

export const FREQUENCY_LANGUAGE_OPTIONS = [
  { value: "english", label: "English" },
  { value: "indonesia", label: "Indonesia" },
] as const;

export const FREQUENCY_TIME_UNIT_OPTIONS = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
] as const;

export type FrequencyLanguageValue =
  (typeof FREQUENCY_LANGUAGE_OPTIONS)[number]["value"];
export type FrequencyTimeUnitValue =
  (typeof FREQUENCY_TIME_UNIT_OPTIONS)[number]["value"];

export type FrequencyPresetRecord = {
  id: string;
  frequency: string;
  language: FrequencyLanguageValue;
  timeIncrement: string;
  timeUnit: FrequencyTimeUnitValue;
  updatedAt: string;
};

export const FREQUENCY_PRESET_RECORDS: FrequencyPresetRecord[] = [
  {
    id: "frequency-1",
    frequency: "3 Times a Year",
    language: "english",
    timeIncrement: "4",
    timeUnit: "month",
    updatedAt: "28 Feb 2026",
  },
  {
    id: "frequency-2",
    frequency: "Annually",
    language: "english",
    timeIncrement: "1",
    timeUnit: "year",
    updatedAt: "15 Mar 2026",
  },
  {
    id: "frequency-3",
    frequency: "Bi-Monthly",
    language: "english",
    timeIncrement: "2",
    timeUnit: "month",
    updatedAt: "31 Mar 2026",
  },
  {
    id: "frequency-4",
    frequency: "Bi-weekly",
    language: "english",
    timeIncrement: "2",
    timeUnit: "week",
    updatedAt: "10 Apr 2026",
  },
  {
    id: "frequency-5",
    frequency: "Fourth-Nightly",
    language: "english",
    timeIncrement: "14",
    timeUnit: "day",
    updatedAt: "30 Apr 2026",
  },
  {
    id: "frequency-6",
    frequency: "Monthly",
    language: "english",
    timeIncrement: "1",
    timeUnit: "month",
    updatedAt: "20 Mei 2026",
  },
  {
    id: "frequency-7",
    frequency: "Quarterly",
    language: "english",
    timeIncrement: "3",
    timeUnit: "month",
    updatedAt: "31 Mei 2026",
  },
  {
    id: "frequency-8",
    frequency: "Weekly",
    language: "english",
    timeIncrement: "1",
    timeUnit: "week",
    updatedAt: "12 Jun 2026",
  },
];

export function getFrequencyLanguageLabel(
  value: FrequencyLanguageValue,
): string {
  return (
    FREQUENCY_LANGUAGE_OPTIONS.find((option) => option.value === value)?.label ??
    value
  );
}

export function getFrequencyTimeUnitLabel(
  value: FrequencyTimeUnitValue,
): string {
  return (
    FREQUENCY_TIME_UNIT_OPTIONS.find((option) => option.value === value)
      ?.label ?? value
  );
}

export function getFrequencyRecordById(id: string): FrequencyPresetRecord {
  return (
    FREQUENCY_PRESET_RECORDS.find((record) => record.id === id) ??
    FREQUENCY_PRESET_RECORDS[0]
  );
}

export const frequencyFormSchema = z.object({
  frequency: z
    .string()
    .trim()
    .min(1, "Frequency wajib diisi")
    .max(120, "Frequency maksimal 120 karakter"),
  language: z.enum(["english", "indonesia"], {
    message: "Language wajib dipilih",
  }),
  timeIncrement: z
    .string()
    .trim()
    .min(1, "Time Increment wajib diisi")
    .regex(/^\d+$/, "Time Increment harus berupa angka"),
  timeUnit: z.enum(["day", "week", "month", "year"], {
    message: "Time Unit wajib dipilih",
  }),
});

export type FrequencyFormData = z.infer<typeof frequencyFormSchema>;
export type FrequencyFormInitialState = FrequencyFormData;

export const CREATE_FREQUENCY_FORM_INITIAL_STATE: FrequencyFormInitialState = {
  frequency: "",
  language: "english",
  timeIncrement: "",
  timeUnit: "day",
};

export function getEditFrequencyFormInitialState(
  id: string,
): FrequencyFormInitialState {
  const preset = getFrequencyRecordById(id);

  return {
    frequency: preset.frequency,
    language: preset.language,
    timeIncrement: preset.timeIncrement,
    timeUnit: preset.timeUnit,
  };
}
