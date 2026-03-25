import { z } from "zod";

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

const optionalTextField = (label: string, maxLength: number) =>
  z
    .string()
    .trim()
    .max(maxLength, `${label} maksimal ${maxLength} karakter`);

export const supplierFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name wajib diisi")
    .max(120, "Name maksimal 120 karakter"),
  address: optionalTextField("Address", 200),
  contact: optionalTextField("Contact", 120),
  phoneNumber: optionalTextField("Phone Number", 30),
  faxNumber: optionalTextField("Fax Number", 30),
  accountNumber: optionalTextField("Account Number", 40),
});

export type SupplierFormData = z.infer<typeof supplierFormSchema>;
export type SupplierFormInitialState = SupplierFormData;

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
    SUPPLIER_FORM_PRESET_RECORDS[safeIndex % SUPPLIER_FORM_PRESET_RECORDS.length] ??
    SUPPLIER_FORM_PRESET_RECORDS[0];

  return { ...preset };
}
