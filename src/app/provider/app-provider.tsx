import type { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryProvider } from "./query-provider";
import { AuthProvider } from "./auth-provider";

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <BrowserRouter>
        <AuthProvider>
          {children}
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </BrowserRouter>
    </QueryProvider>
  );
}