import type React from "react";
import { NavLink } from "react-router-dom";
import { navigationItems } from "@/app/config/navigation";
import { cn } from "@/shared/lib/cn";
import { useUiStore } from "@/app/store/ui.store";
import { usePermission } from "@/shared/hooks/use-permission";
import type { AppPermission } from "@/app/config/permissions";

export function Sidebar() {
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);

  return (
    <aside
      className={cn(
        "border-r bg-background transition-all duration-200",
        sidebarOpen ? "w-64" : "w-20"
      )}
    >
      <div className="flex h-16 items-center border-b px-4 font-semibold">
        {sidebarOpen ? "Library Admin" : "LA"}
      </div>

      <nav className="space-y-1 p-2">
        {navigationItems.map((item) => (
          <SidebarNavItem
            key={item.to}
            label={item.label}
            to={item.to}
            icon={item.icon}
            sidebarOpen={sidebarOpen}
            permission={item.permission}
          />
        ))}
      </nav>
    </aside>
  );
}

type SidebarNavItemProps = {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  sidebarOpen: boolean;
  permission?: AppPermission;
};

function SidebarNavItem({
  label,
  to,
  icon: Icon,
  sidebarOpen,
  permission,
}: SidebarNavItemProps) {
  const allowed = usePermission(permission);

  if (!allowed) return null;

  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
          isActive
            ? "bg-muted font-medium text-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )
      }
    >
      <Icon className="h-4 w-4 shrink-0" />
      {sidebarOpen && <span>{label}</span>}
    </NavLink>
  );
}