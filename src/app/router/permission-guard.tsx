import type { PropsWithChildren, ReactNode } from "react";
import type { AppPermission } from "@/app/config/permissions";
import { usePermission } from "@/shared/hooks/use-permission";

type PermissionGuardProps = PropsWithChildren<{
  permission: AppPermission;
  fallback?: ReactNode;
}>;

export function PermissionGuard({
  permission,
  fallback = null,
  children,
}: PermissionGuardProps) {
  const allowed = usePermission(permission);

  if (!allowed) return <>{fallback}</>;
  return <>{children}</>;
}