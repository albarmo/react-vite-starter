"use client";

import { z } from "zod";

export const bookRequestRejectSchema = z.object({
  reason: z.string().trim().min(1, "Reason wajib diisi."),
});
