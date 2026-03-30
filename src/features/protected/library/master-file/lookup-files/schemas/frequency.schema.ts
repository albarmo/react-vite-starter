import { z } from "zod";

export const frequencyFormSchema = z.object({
  frequency: z
    .string()
    .trim()
    .min(1, "Frequency wajib diisi")
    .max(120, "Frequency maksimal 120 karakter"),
  language: z.enum(["english", "indonesia"], {
    message: "Language wajib dipilih",
  }),
  timeIncrement: z
    .string()
    .trim()
    .min(1, "Time Increment wajib diisi")
    .regex(/^\d+$/, "Time Increment harus berupa angka"),
  timeUnit: z.enum(["day", "week", "month", "year"], {
    message: "Time Unit wajib dipilih",
  }),
});
