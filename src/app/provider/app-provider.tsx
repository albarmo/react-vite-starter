import type { PropsWithChildren } from "react";
import { Toaster } from "sonner";
import { QueryProvider } from "./query-provider";
import { AuthProvider } from "./auth-provider";

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <AuthProvider>
        {children}
        <Toaster richColors position="top-right" />
      </AuthProvider>
    </QueryProvider>
  );
}