import type {
  CollectionTypeFormInitialState,
  CollectionTypeRecord,
} from "@/features/master-file/lookup-files/types/collection-type.types";

export const COLLECTION_TYPE_PRESET_RECORDS: CollectionTypeRecord[] = [
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
