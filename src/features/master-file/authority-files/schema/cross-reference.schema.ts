import { z } from "zod";

export const crossReferenceFormSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, "Code wajib diisi")
    .max(20, "Code maksimal 20 karakter")
    .regex(/^[A-Za-z0-9-]+$/, "Code hanya boleh huruf, angka, dan tanda hubung"),
  description: z
    .string()
    .trim()
    .min(1, "Description wajib diisi")
    .max(400, "Description maksimal 400 karakter"),
});
