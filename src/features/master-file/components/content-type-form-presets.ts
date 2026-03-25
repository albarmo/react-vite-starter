import { z } from "zod";

const CONTENT_TYPE_FORM_PRESET_RECORDS = [
  {
    code: "crd",
    name: "cartographic dataset",
    marcLeaderCode: "e",
  },
  {
    code: "cri",
    name: "cartographic image",
    marcLeaderCode: "k",
  },
  {
    code: "crm",
    name: "cartographic moving image",
    marcLeaderCode: "g",
  },
  {
    code: "crt",
    name: "cartographic tactile image",
    marcLeaderCode: "r",
  },
  {
    code: "crn",
    name: "cartographic tactile three-dimensional form",
    marcLeaderCode: "r",
  },
  {
    code: "crf",
    name: "cartographic three-dimensional form",
    marcLeaderCode: "r",
  },
  {
    code: "cod",
    name: "computer dataset",
    marcLeaderCode: "m",
  },
  {
    code: "cop",
    name: "computer program",
    marcLeaderCode: "m",
  },
  {
    code: "ntv",
    name: "notated movement",
    marcLeaderCode: "d",
  },
  {
    code: "ntm",
    name: "notated music",
    marcLeaderCode: "c",
  },
] as const;

export const contentTypeFormSchema = z.object({
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
  marcLeaderCode: z
    .string()
    .trim()
    .min(1, "MARC Leader Code wajib diisi")
    .max(10, "MARC Leader Code maksimal 10 karakter")
    .regex(/^[A-Za-z0-9]+$/, "MARC Leader Code hanya boleh huruf dan angka"),
});

export type ContentTypeFormData = z.infer<typeof contentTypeFormSchema>;
export type ContentTypeFormInitialState = ContentTypeFormData;

export const CREATE_CONTENT_TYPE_FORM_INITIAL_STATE: ContentTypeFormInitialState =
  {
    code: "",
    name: "",
    marcLeaderCode: "",
  };

export function getEditContentTypeFormInitialState(
  id: string,
): ContentTypeFormInitialState {
  const matchedIndex = Number.parseInt(id.replace(/^content-type-/, ""), 10);
  const safeIndex = Number.isFinite(matchedIndex) && matchedIndex > 0
    ? matchedIndex - 1
    : 0;
  const preset =
    CONTENT_TYPE_FORM_PRESET_RECORDS[
      safeIndex % CONTENT_TYPE_FORM_PRESET_RECORDS.length
    ] ?? CONTENT_TYPE_FORM_PRESET_RECORDS[0];

  return { ...preset };
}
