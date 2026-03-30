import { useQuery } from "@tanstack/react-query";
import { getMembers } from "../api/get-members";
import { queryKeys } from "@/shared/lib/query-keys";
import type { TableQueryParams } from "@/shared/types/table.type";

export function useMembers(params: TableQueryParams) {
  return useQuery({
    queryKey: queryKeys.membership.list(params),
    queryFn: () => getMembers(params),
    placeholderData: (previousData) => previousData,
  });
}