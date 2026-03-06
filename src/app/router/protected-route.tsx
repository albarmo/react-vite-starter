import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/app/store/auth.store";
import { LoadingScreen } from "@/shared/components/common/loading-screen";
import { usePermission } from "@/shared/hooks/use-permission";
import type { AppPermission } from "../config/permissions";

type ProtectedRouteProps = {
  permission: AppPermission;
};

export function ProtectedRoute({ permission }: ProtectedRouteProps) {
  const location = useLocation();
  const { status, isBootstrapped } = useAuthStore();
  const allowed = usePermission(permission);

  if (!isBootstrapped || status === "idle" || status === "loading" || status === "refreshing") {
    return <LoadingScreen />;
  }

  if (status !== "authenticated") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!allowed) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}