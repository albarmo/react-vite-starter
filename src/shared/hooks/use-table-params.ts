import { useState } from "react";
import type { TableQueryParams, TableSortOrder } from "@/shared/types/table.type";

export function useTableParams(initial?: Partial<TableQueryParams>) {
  const [params, setParams] = useState<TableQueryParams>({
    page: initial?.page ?? 1,
    perPage: initial?.perPage ?? 10,
    search: initial?.search ?? "",
    sortBy: initial?.sortBy,
    sortOrder: initial?.sortOrder ?? "asc",
  });

  const setPage = (page: number) =>
    setParams((prev) => ({
      ...prev,
      page,
    }));

  const setPerPage = (perPage: number) =>
    setParams((prev) => ({
      ...prev,
      perPage,
      page: 1,
    }));

  const setSearch = (search: string) =>
    setParams((prev) => ({
      ...prev,
      search,
      page: 1,
    }));

  const setSort = (sortBy: string, sortOrder: TableSortOrder) =>
    setParams((prev) => ({
      ...prev,
      sortBy,
      sortOrder,
      page: 1,
    }));

  return {
    params,
    setParams,
    setPage,
    setPerPage,
    setSearch,
    setSort,
  };
}