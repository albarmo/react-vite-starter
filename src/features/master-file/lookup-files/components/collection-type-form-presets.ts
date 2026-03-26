import { z } from "zod";

export type CollectionTypePresetRecord = {
  id: string;
  type: string;
  updatedAt: string;
};

export const COLLECTION_TYPE_PRESET_RECORDS: CollectionTypePresetRecord[] = [
  {
    id: "collection-type-1",
    type: "Fiction",
    updatedAt: "28 Feb 2026",
  },
  {
    id: "collection-type-2",
    type: "Reference",
    updatedAt: "28 Feb 2026",
  },
  {
    id: "collection-type-3",
    type: "Textbook",
    updatedAt: "28 Feb 2026",
  },
];

export const collectionTypeFormSchema = z.object({
  type: z
    .string()
    .trim()
    .min(1, "Type wajib diisi")
    .max(120, "Type maksimal 120 karakter"),
});

export type CollectionTypeFormData = z.infer<typeof collectionTypeFormSchema>;
export type CollectionTypeFormInitialState = CollectionTypeFormData;

export const CREATE_COLLECTION_TYPE_FORM_INITIAL_STATE: CollectionTypeFormInitialState =
  {
    type: "",
  };

export function getEditCollectionTypeFormInitialState(
  id: string,
): CollectionTypeFormInitialState {
  const preset =
    COLLECTION_TYPE_PRESET_RECORDS.find((record) => record.id === id) ??
    COLLECTION_TYPE_PRESET_RECORDS[0];

  return {
    type: preset.type,
  };
}
