import { z } from "zod";

export const docLanguageFormSchema = z.object({
  language: z
    .string()
    .trim()
    .min(1, "Language wajib diisi")
    .max(120, "Language maksimal 120 karakter"),
});
