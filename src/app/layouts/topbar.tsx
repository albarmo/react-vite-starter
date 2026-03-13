import { LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUiStore } from "@/app/store/ui.store";
import { useAuthStore } from "@/app/store/auth.store";
import { useLogout } from "@/features/auth/hooks/use-logout";
import { Button } from "@/shared/components/ui/button";

export function Topbar() {
  const navigate = useNavigate();
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const user = useAuthStore((state) => state.user);
  const { mutateAsync, isPending } = useLogout();

  const handleLogout = async () => {
    await mutateAsync();
    navigate("/login", { replace: true });
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-3 sm:px-4">
      <Button variant="ghost" size="icon" onClick={toggleSidebar}>
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium">{user?.name ?? "-"}</p>
          <p className="text-xs text-muted-foreground">{user?.email ?? "-"}</p>
        </div>

        <Button
          variant="outline"
          size="icon-sm"
          onClick={handleLogout}
          disabled={isPending}
          className="sm:h-9 sm:w-auto sm:px-3"
        >
          <LogOut className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
}
