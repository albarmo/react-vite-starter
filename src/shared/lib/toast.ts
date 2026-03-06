import { toast } from "sonner";
import { normalizeApiError } from "./api-error";

export const appToast = {
  success(message: string) {
    toast.success(message);
  },

  error(error: unknown, fallbackMessage = "Terjadi kesalahan") {
    const normalized = normalizeApiError(error);
    toast.error(normalized.message || fallbackMessage);
  },

  info(message: string) {
    toast.info(message);
  },

  warning(message: string) {
    toast.warning(message);
  },
};