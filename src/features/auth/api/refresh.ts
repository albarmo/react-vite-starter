import { api } from "@/shared/lib/axios";
import type { LoginResponse } from "../types/auth.type";

export async function refreshToken() {
  const { data } = await api.post<LoginResponse>("/auth/refresh");
  return data;
}