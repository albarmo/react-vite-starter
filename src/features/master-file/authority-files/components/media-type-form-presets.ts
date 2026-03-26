import { z } from "zod";

const MEDIA_TYPE_FORM_PRESET_RECORDS = [
  {
    code: "s",
    name: "audio",
    marcLeaderCode: "s",
  },
  {
    code: "c",
    name: "computer",
    marcLeaderCode: "c",
  },
  {
    code: "h",
    name: "microform",
    marcLeaderCode: "h",
  },
  {
    code: "p",
    name: "microscopic",
    marcLeaderCode: "p",
  },
  {
    code: "x",
    name: "other",
    marcLeaderCode: "x",
  },
  {
    code: "g",
    name: "projected",
    marcLeaderCode: "g",
  },
  {
    code: "e",
    name: "stereographic",
    marcLeaderCode: "e",
  },
  {
    code: "n",
    name: "unmediated",
    marcLeaderCode: "n",
  },
  {
    code: "z",
    name: "unspecified",
    marcLeaderCode: "z",
  },
  {
    code: "v",
    name: "video",
    marcLeaderCode: "v",
  },
] as const;

export const mediaTypeFormSchema = z.object({
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

export type MediaTypeFormData = z.infer<typeof mediaTypeFormSchema>;
export type MediaTypeFormInitialState = MediaTypeFormData;

export const CREATE_MEDIA_TYPE_FORM_INITIAL_STATE: MediaTypeFormInitialState = {
  code: "",
  name: "",
  marcLeaderCode: "",
};

export function getEditMediaTypeFormInitialState(
  id: string,
): MediaTypeFormInitialState {
  const matchedIndex = Number.parseInt(id.replace(/^media-type-/, ""), 10);
  const safeIndex =
    Number.isFinite(matchedIndex) && matchedIndex > 0 ? matchedIndex - 1 : 0;
  const preset =
    MEDIA_TYPE_FORM_PRESET_RECORDS[
      safeIndex % MEDIA_TYPE_FORM_PRESET_RECORDS.length
    ] ?? MEDIA_TYPE_FORM_PRESET_RECORDS[0];

  return { ...preset };
}
