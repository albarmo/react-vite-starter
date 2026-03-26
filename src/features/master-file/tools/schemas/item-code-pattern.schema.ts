import { z } from "zod";

export const itemCodePatternFormSchema = z.object({
  prefix: z
    .string()
    .trim()
    .min(1, "Prefix wajib diisi")
    .max(20, "Prefix maksimal 20 karakter"),
  suffix: z
    .string()
    .trim()
    .min(1, "Suffix wajib diisi")
    .max(20, "Suffix maksimal 20 karakter"),
  serialLength: z
    .string()
    .trim()
    .min(1, "Length Serial Number wajib diisi")
    .regex(/^\d+$/, "Length Serial Number harus berupa angka")
    .max(10, "Length Serial Number maksimal 10 digit"),
});
