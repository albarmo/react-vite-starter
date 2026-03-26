import { z } from "zod";

export const CATALOGING_SERVER_TYPE_OPTIONS = [
  { value: "p2p-server", label: "P2P server" },
  { value: "z3950-server", label: "z3950 server" },
  { value: "z3950-sru-server", label: "z3950 SRU server" },
  { value: "marc-sru-server", label: "MARC SRU server" },
] as const;

export type CatalogingServerTypeValue =
  (typeof CATALOGING_SERVER_TYPE_OPTIONS)[number]["value"];

export type CatalogingServerPresetRecord = {
  id: string;
  name: string;
  url: string;
  type: CatalogingServerTypeValue;
  updatedAt: string;
};

export const CATALOGING_SERVER_PRESET_RECORDS: CatalogingServerPresetRecord[] = [
  {
    id: "cataloging-server-1",
    name: "Senayan",
    url: "www.senayan.com",
    type: "p2p-server",
    updatedAt: "28 Feb 2026",
  },
];

export function getCatalogingServerTypeLabel(
  value: CatalogingServerTypeValue,
): string {
  return (
    CATALOGING_SERVER_TYPE_OPTIONS.find((option) => option.value === value)
      ?.label ?? value
  );
}

export function getCatalogingServerRecordById(
  id: string,
): CatalogingServerPresetRecord {
  return (
    CATALOGING_SERVER_PRESET_RECORDS.find((record) => record.id === id) ??
    CATALOGING_SERVER_PRESET_RECORDS[0]
  );
}

export const catalogingServerFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name wajib diisi")
    .max(120, "Name maksimal 120 karakter"),
  url: z
    .string()
    .trim()
    .min(1, "URL wajib diisi")
    .max(255, "URL maksimal 255 karakter"),
  type: z.enum(
    [
      "p2p-server",
      "z3950-server",
      "z3950-sru-server",
      "marc-sru-server",
    ],
    {
      message: "Type wajib dipilih",
    },
  ),
});

export type CatalogingServerFormData = z.infer<
  typeof catalogingServerFormSchema
>;
export type CatalogingServerFormInitialState = CatalogingServerFormData;

export const CREATE_CATALOGING_SERVER_FORM_INITIAL_STATE: CatalogingServerFormInitialState =
  {
    name: "",
    url: "",
    type: "p2p-server",
  };

export function getEditCatalogingServerFormInitialState(
  id: string,
): CatalogingServerFormInitialState {
  const preset = getCatalogingServerRecordById(id);

  return {
    name: preset.name,
    url: preset.url,
    type: preset.type,
  };
}
