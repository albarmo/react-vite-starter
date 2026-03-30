import type { MediaTypeFormInitialState } from "@/features/protected/library/master-file/authority-files/types/media-type.types";

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
