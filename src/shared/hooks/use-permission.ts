import { useAuthStore } from "@/app/store/auth.store";
import type { AppPermission } from "@/app/config/permissions";

export function usePermission(permission?: AppPermission) {
  const permissions = useAuthStore((state) => state.user?.permissions ?? []);

  if (!permission) return true;

  return permissions.includes(permission);
}

export function useHasAnyPermission(permissionsToCheck: AppPermission[]) {
  const permissions = useAuthStore((state) => state.user?.permissions ?? []);
  return permissionsToCheck.some((permission) => permissions.includes(permission));
}