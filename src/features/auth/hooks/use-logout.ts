import { useMutation } from "@tanstack/react-query";
import { sessionService } from "../services/session.service";

export function useLogout() {
  return useMutation({
    mutationFn: sessionService.logout,
  });
}