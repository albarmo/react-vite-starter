import { z } from "zod";

export const catalogingServerFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name wajib diisi")
    .max(120, "Name maksimal 120 karakter"),
  url: z
    .string()
    .trim()
    .min(1, "URL wajib diisi")
    .max(255, "URL maksimal 255 karakter"),
  type: z.enum(
    [
      "p2p-server",
      "z3950-server",
      "z3950-sru-server",
      "marc-sru-server",
    ],
    {
      message: "Type wajib dipilih",
    },
  ),
});
