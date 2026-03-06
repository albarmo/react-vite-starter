import { useMutation } from "@tanstack/react-query";
import { sessionService } from "../services/session.service";

export function useLogin() {
  return useMutation({
    mutationFn: sessionService.login,
  });
}