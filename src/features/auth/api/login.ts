import { api } from "@/shared/lib/axios";
import type { LoginPayload, LoginResponse } from "../types/auth.type";

export async function login(payload: LoginPayload) {
  const { data } = await api.post<LoginResponse>("/auth/login", payload);
  return data;
}