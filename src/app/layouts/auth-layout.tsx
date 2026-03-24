import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="flex h-svh w-full items-center justify-center bg-muted/30">
      <Outlet />
    </div>
  );
}
