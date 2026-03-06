import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/app/store/auth.store";
import { LoadingScreen } from "@/shared/components/common/loading-screen";

export function PublicRoute() {
  const { status, isBootstrapped } = useAuthStore();

  if (!isBootstrapped || status === "idle" || status === "loading" || status === "refreshing") {
    return <LoadingScreen />;
  }

  if (status === "authenticated") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}