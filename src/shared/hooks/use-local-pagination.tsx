import { Pagination, PaginationProps } from "@/components/pagination";
import { type Pagination as PaginationType } from "@/types/pagination";
import { useCallback, useMemo, useState } from "react";

type UseLocalPaginationProps<T> = {
  data: T[];
}

type UseLocalPaginationReturn<T> = {
  paginatedData: T[];
  pagination: PaginationType;
  renderPagination: (props?: Partial<PaginationProps>) => React.ReactElement;
}

export function useLocalPagination<T>({
  data
}: UseLocalPaginationProps<T>): UseLocalPaginationReturn<T> {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const paginatedData = useMemo(() => {
    return data.slice(start, end);
  }, [start, end, data]);

  const from = start + 1;
  const to = start + paginatedData.length;
  const total = data.length;
  const lastPage = Math.ceil(total / perPage);

  const pagination = {
    start,
    end,
    from,
    to,
    lastPage,
    total,
    currentPage: page,
    perPage,
  }

  const renderPagination = useCallback((props?: Partial<PaginationProps>) => (
    <Pagination
      currentPage={page}
      perPage={perPage}
      total={total}
      from={from}
      to={to}
      lastPage={lastPage}
      onChange={(v) => {
        if (v.currentPage) setPage(v.currentPage);
        if (v.perPage) setPerPage(v.perPage);
      }}
      {...props}
    />
  ), [page, perPage, total, from, to, lastPage])

  return {
    paginatedData,
    pagination,
    renderPagination
  }
}