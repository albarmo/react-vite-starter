import { z } from "zod";

export type LabelAttachment = {
  name: string;
  size: number;
  format: string;
};

export type LabelPresetRecord = {
  id: string;
  name: string;
  description: string;
  attachment: LabelAttachment | null;
  updatedAt: string;
};

export const LABEL_PRESET_RECORDS: LabelPresetRecord[] = [
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

export function getLabelRecordById(id: string): LabelPresetRecord {
  return (
    LABEL_PRESET_RECORDS.find((record) => record.id === id) ??
    LABEL_PRESET_RECORDS[0]
  );
}

const labelAttachmentSchema = z.object({
  name: z.string().trim().min(1),
  size: z.number().min(0),
  format: z.string().trim().min(1),
});

export const labelFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name wajib diisi")
    .max(120, "Name maksimal 120 karakter"),
  attachment: labelAttachmentSchema.nullable(),
  description: z
    .string()
    .trim()
    .max(160, "Description maksimal 160 karakter")
    .optional()
    .or(z.literal("")),
});

export type LabelFormData = z.infer<typeof labelFormSchema>;
export type LabelFormInitialState = LabelFormData;

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
