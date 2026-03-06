import axios, { AxiosError } from "axios";
import type { ApiErrorNormalized, ApiFieldErrors } from "@/shared/types/api.type";

type BackendErrorShape = {
  code?: string;
  message?: string;
  errors?: ApiFieldErrors;
};

function isBackendErrorShape(value: unknown): value is BackendErrorShape {
  return typeof value === "object" && value !== null;
}

export function normalizeApiError(error: unknown): ApiErrorNormalized {
  if (!axios.isAxiosError(error)) {
    return {
      status: 500,
      code: "UNKNOWN_ERROR",
      message: error instanceof Error ? error.message : "Terjadi kesalahan",
      raw: error,
    };
  }

  const axiosError = error as AxiosError<BackendErrorShape>;
  const status = axiosError.response?.status ?? 500;
  const data = axiosError.response?.data;

  if (isBackendErrorShape(data)) {
    return {
      status,
      code: data.code ?? "API_ERROR",
      message: data.message ?? "Request gagal diproses",
      fieldErrors: data.errors,
      raw: error,
    };
  }

  if (axiosError.code === "ECONNABORTED") {
    return {
      status: 408,
      code: "REQUEST_TIMEOUT",
      message: "Request timeout",
      raw: error,
    };
  }

  if (!axiosError.response) {
    return {
      status: 0,
      code: "NETWORK_ERROR",
      message: "Tidak dapat terhubung ke server",
      raw: error,
    };
  }

  return {
    status,
    code: "API_ERROR",
    message: "Terjadi kesalahan pada server",
    raw: error,
  };
}

export function getFieldError(
  fieldErrors: ApiFieldErrors | undefined,
  fieldName: string
) {
  return fieldErrors?.[fieldName]?.[0];
}