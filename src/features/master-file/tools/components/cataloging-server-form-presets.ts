import type {
  CatalogingServerFormInitialState,
  CatalogingServerRecord,
  CatalogingServerTypeValue,
} from "@/features/master-file/tools/types/cataloging-server.types";

export const CATALOGING_SERVER_TYPE_OPTIONS = [
  { value: "p2p-server", label: "P2P server" },
  { value: "z3950-server", label: "z3950 server" },
  { value: "z3950-sru-server", label: "z3950 SRU server" },
  { value: "marc-sru-server", label: "MARC SRU server" },
] as const;

export const CATALOGING_SERVER_PRESET_RECORDS: CatalogingServerRecord[] = [
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
): CatalogingServerRecord {
  return (
    CATALOGING_SERVER_PRESET_RECORDS.find((record) => record.id === id) ??
    CATALOGING_SERVER_PRESET_RECORDS[0]
  );
}

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
