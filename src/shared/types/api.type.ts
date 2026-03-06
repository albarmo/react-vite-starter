export type ApiFieldErrors = Record<string, string[]>;

export type ApiErrorNormalized = {
  status: number;
  code: string;
  message: string;
  fieldErrors?: ApiFieldErrors;
  raw?: unknown;
};

export type ApiPaginationMeta = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
};

export type ApiListResponse<T> = {
  data: T[];
  meta: ApiPaginationMeta;
};