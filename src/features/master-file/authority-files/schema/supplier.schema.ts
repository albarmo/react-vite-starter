import { z } from "zod";

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
