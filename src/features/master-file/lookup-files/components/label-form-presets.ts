import type {
  LabelFormInitialState,
  LabelRecord,
} from "@/features/master-file/lookup-files/types/label.types";

export const LABEL_PRESET_RECORDS: LabelRecord[] = [
  {
    id: "label-1",
    name: "label-favorite",
    description: "Favorite Title",
    attachment: {
      name: "label-favorite.jpg",
      size: 500 * 1024,
      format: "JPG",
    },
    updatedAt: "28 Feb 2026",
  },
  {
    id: "label-2",
    name: "label-multimedia",
    description: "Multimedia",
    attachment: null,
    updatedAt: "28 Feb 2026",
  },
  {
    id: "label-3",
    name: "label-new",
    description: "New Title",
    attachment: null,
    updatedAt: "28 Feb 2026",
  },
];

export function getLabelRecordById(id: string): LabelRecord {
  return (
    LABEL_PRESET_RECORDS.find((record) => record.id === id) ??
    LABEL_PRESET_RECORDS[0]
  );
}

export const CREATE_LABEL_FORM_INITIAL_STATE: LabelFormInitialState = {
  name: "",
  attachment: null,
  description: "",
};

export function getEditLabelFormInitialState(id: string): LabelFormInitialState {
  const preset = getLabelRecordById(id);

  return {
    name: preset.name,
    attachment: preset.attachment,
    description: preset.description,
  };
}
