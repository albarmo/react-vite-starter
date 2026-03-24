import type { AuthUser } from "@/features/auth/types/auth.type";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

type AppAvatarDropdownProps = {
  user: AuthUser | null;
  isLoggingOut?: boolean;
  onLogout: () => Promise<void> | void;
};

function getInitials(name?: string) {
  const parts = name?.trim().split(/\s+/).filter(Boolean) ?? [];
  const initials = parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return initials || "PG";
}

function formatRole(role?: string) {
  if (!role) return "Pengguna";

  return role
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function AppAvatarDropdown({
  user,
  isLoggingOut = false,
  onLogout,
}: AppAvatarDropdownProps) {
  const displayName = user?.name ?? "Pengguna";
  const displayEmail = user?.email ?? "Email belum tersedia";
  const primaryRole = formatRole(user?.roles[0]);

  const handleSelectLogout = (event: Event) => {
    event.preventDefault();
    if (isLoggingOut) return;
    void onLogout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="h-auto rounded-full p-1 text-grey-100 hover:bg-neutral-200 sm:rounded-2xl sm:px-2 sm:py-1.5"
          aria-label="Profile"
        >
          <Avatar className="size-8">
            <AvatarFallback className="bg-grey-40 text-xs font-semibold text-blue-70">
              {getInitials(user?.name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 rounded-md border-grey-30 p-0"
      >
        <div className="px-4 py-4">
          <p className="truncate text-base font-semibold text-grey-100">
            {displayName}
          </p>
          <p className="mt-1 truncate text-xs text-grey-80">{displayEmail}</p>
          <Badge variant="outline" className="mt-3 rounded-full border-grey-40">
            {primaryRole}
          </Badge>
        </div>

        <DropdownMenuSeparator className="mx-0 my-0 bg-grey-30" />

        <DropdownMenuItem
          variant="destructive"
          disabled={isLoggingOut}
          className="px-4 py-3"
          onSelect={handleSelectLogout}
        >
          <LogOut className="size-4" />
          {isLoggingOut ? "Sedang keluar..." : "Keluar"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
