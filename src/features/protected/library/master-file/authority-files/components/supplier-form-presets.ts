import type { SupplierFormInitialState } from "@/features/protected/library/master-file/authority-files/types/supplier.types";

const SUPPLIER_FORM_PRESET_RECORDS = [
  {
    name: "Gramedia",
    address: "Jalan Abuserin III",
    contact: "Mariyanto",
    phoneNumber: "081234567890",
    faxNumber: "081234567890",
    accountNumber: "081234567890",
  },
] as const;

export const CREATE_SUPPLIER_FORM_INITIAL_STATE: SupplierFormInitialState = {
  name: "",
  address: "",
  contact: "",
  phoneNumber: "",
  faxNumber: "",
  accountNumber: "",
};

export function getEditSupplierFormInitialState(
  id: string,
): SupplierFormInitialState {
  const matchedIndex = Number.parseInt(id.replace(/^supplier-/, ""), 10);
  const safeIndex =
    Number.isFinite(matchedIndex) && matchedIndex > 0 ? matchedIndex - 1 : 0;
  const preset =
    SUPPLIER_FORM_PRESET_RECORDS[
      safeIndex % SUPPLIER_FORM_PRESET_RECORDS.length
    ] ?? SUPPLIER_FORM_PRESET_RECORDS[0];

  return { ...preset };
}
