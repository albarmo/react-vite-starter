import { z } from "zod";

export const itemStatusFormSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, "Code wajib diisi")
    .max(20, "Code maksimal 20 karakter"),
  name: z
    .string()
    .trim()
    .min(1, "Name wajib diisi")
    .max(120, "Name maksimal 120 karakter"),
  rules: z.array(
    z.enum(["no-loan-transaction", "skipped-by-stock-take"]),
  ),
});
