export type TableSortOrder = "asc" | "desc";

export type TableQueryParams = {
  page: number;
  perPage: number;
  search?: string;
  sortBy?: string;
  sortOrder?: TableSortOrder;
};