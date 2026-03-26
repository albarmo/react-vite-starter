import { z } from "zod";

export const collectionTypeFormSchema = z.object({
  type: z
    .string()
    .trim()
    .min(1, "Type wajib diisi")
    .max(120, "Type maksimal 120 karakter"),
});
