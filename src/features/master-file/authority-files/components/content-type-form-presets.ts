import type { ContentTypeFormInitialState } from "@/features/master-file/authority-files/types/content-type.types";

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
