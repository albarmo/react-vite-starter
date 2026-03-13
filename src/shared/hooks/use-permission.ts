import { useAuthStore } from "@/app/store/auth.store";
import type { AppPermission } from "@/app/config/permissions";

const EMPTY_PERMISSIONS: ReadonlyArray<AppPermission> = [];

function selectPermissions(state: { user: { permissions: AppPermission[] } | null }) {
  return state.user?.permissions ?? EMPTY_PERMISSIONS;
}

export function usePermission(permission?: AppPermission) {
  const permissions = useAuthStore(selectPermissions);

  if (!permission) return true;

  return permissions.includes(permission);
}

export function useHasAnyPermission(permissionsToCheck: AppPermission[]) {
  const permissions = useAuthStore(selectPermissions);
  return permissionsToCheck.some((permission) => permissions.includes(permission));
}
