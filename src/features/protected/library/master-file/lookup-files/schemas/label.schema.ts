import { z } from "zod";

const labelAttachmentSchema = z.object({
  name: z.string().trim().min(1),
  size: z.number().min(0),
  format: z.string().trim().min(1),
});

export const labelFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name wajib diisi")
    .max(120, "Name maksimal 120 karakter"),
  attachment: labelAttachmentSchema.nullable(),
  description: z
    .string()
    .trim()
    .max(160, "Description maksimal 160 karakter")
    .optional()
    .or(z.literal("")),
});
