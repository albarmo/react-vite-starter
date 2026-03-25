import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";

type AuthLayoutProps = {
  children?: ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex h-svh w-full items-center justify-center bg-muted/30">
      {children ?? <Outlet />}
    </div>
  );
}
