import { api } from "@/shared/lib/axios";

export async function logout() {
  await api.post("/auth/logout");
}