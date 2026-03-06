import { api } from "@/shared/lib/axios";
import { toQueryString } from "@/shared/lib/query-string";
import type { ApiListResponse } from "@/shared/types/api.type";
import type { TableQueryParams } from "@/shared/types/table.type";
import type { Member } from "../types/member.type";

export async function getMembers(params: TableQueryParams) {
  const queryString = toQueryString(params);
  const { data } = await api.get<ApiListResponse<Member>>(
    `/members?${queryString}`
  );
  return data;
}