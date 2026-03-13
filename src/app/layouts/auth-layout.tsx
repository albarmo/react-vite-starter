import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="flex w-svw min-h-screen items-center justify-center bg-muted/30">
        <Outlet />
    </div>
  );
}