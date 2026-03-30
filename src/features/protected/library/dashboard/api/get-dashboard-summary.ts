import { api } from "@/shared/lib/axios";
import type { DashboardSummaryResponse } from "../types/dashboard.type";

export async function getDashboardSummary() {
  const { data } = await api.get<DashboardSummaryResponse>("/dashboard/summary");
  return data;
}