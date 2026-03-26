import { z } from "zod";

export const mediaTypeFormSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, "Code wajib diisi")
    .max(20, "Code maksimal 20 karakter")
    .regex(/^[A-Za-z0-9-]+$/, "Code hanya boleh huruf, angka, dan tanda hubung"),
  name: z
    .string()
    .trim()
    .min(1, "Name wajib diisi")
    .max(120, "Name maksimal 120 karakter"),
  marcLeaderCode: z
    .string()
    .trim()
    .min(1, "MARC Leader Code wajib diisi")
    .max(10, "MARC Leader Code maksimal 10 karakter")
    .regex(/^[A-Za-z0-9]+$/, "MARC Leader Code hanya boleh huruf dan angka"),
});
