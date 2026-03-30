import { z } from "zod";

export const authorFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name wajib diisi")
    .max(120, "Name maksimal 120 karakter"),
  birthYear: z
    .string()
    .trim()
    .max(4, "Birth Year maksimal 4 karakter")
    .refine((value) => value.length === 0 || /^\d{4}$/.test(value), {
      message: "Birth Year harus 4 digit",
    }),
  type: z.enum(["personal-name", "organizational-body", "conference"], {
    errorMap: () => ({ message: "Type wajib dipilih" }),
  }),
  files: z.string().trim().max(120, "Files maksimal 120 karakter"),
});
