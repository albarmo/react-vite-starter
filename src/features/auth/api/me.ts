import { api } from "@/shared/lib/axios";
import type { MeResponse } from "../types/auth.type";

export async function getMe() {
  const { data } = await api.get<MeResponse>("/auth/me");
  return data;
}