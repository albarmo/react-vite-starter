import { useQuery } from "@tanstack/react-query";
import { getDashboardSummary } from "../api/get-dashboard-summary";
import { queryKeys } from "@/shared/lib/query-keys";

export function useDashboardSummary() {
  return useQuery({
    queryKey: queryKeys.dashboard.summary(),
    queryFn: getDashboardSummary,
  });
}