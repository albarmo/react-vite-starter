import { useEffect, type PropsWithChildren } from "react";
import { sessionService } from "@/features/auth/services/session.service";

export function AuthProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    void sessionService.bootstrap();
  }, []);

  return children;
}