import type { CarrierTypeFormInitialState } from "@/features/protected/library/master-file/authority-files/types/carrier-type.types";

const CARRIER_TYPE_FORM_PRESET_RECORDS = [
  {
    code: "ha",
    name: "aperture card",
    marcLeaderCode: "a",
  },
  {
    code: "sg",
    name: "audio cartridge",
    marcLeaderCode: "s",
  },
  {
    code: "se",
    name: "audio cylinder",
    marcLeaderCode: "s",
  },
  {
    code: "sd",
    name: "audio disc",
    marcLeaderCode: "s",
  },
  {
    code: "sq",
    name: "audio roll",
    marcLeaderCode: "s",
  },
  {
    code: "ss",
    name: "audiocassette",
    marcLeaderCode: "s",
  },
  {
    code: "st",
    name: "audiotape reel",
    marcLeaderCode: "s",
  },
  {
    code: "no",
    name: "card",
    marcLeaderCode: "n",
  },
  {
    code: "ck",
    name: "computer card",
    marcLeaderCode: "c",
  },
  {
    code: "cb",
    name: "computer chip cartridge",
    marcLeaderCode: "c",
  },
] as const;

export const CREATE_CARRIER_TYPE_FORM_INITIAL_STATE: CarrierTypeFormInitialState =
  {
    code: "",
    name: "",
    marcLeaderCode: "",
  };

export function getEditCarrierTypeFormInitialState(
  id: string,
): CarrierTypeFormInitialState {
  const matchedIndex = Number.parseInt(id.replace(/^carrier-type-/, ""), 10);
  const safeIndex =
    Number.isFinite(matchedIndex) && matchedIndex > 0 ? matchedIndex - 1 : 0;
  const preset =
    CARRIER_TYPE_FORM_PRESET_RECORDS[
      safeIndex % CARRIER_TYPE_FORM_PRESET_RECORDS.length
    ] ?? CARRIER_TYPE_FORM_PRESET_RECORDS[0];

  return { ...preset };
}
