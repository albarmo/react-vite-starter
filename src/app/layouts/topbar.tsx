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
    <header className="flex h-16 items-center justify-between border-b bg-background px-4">
      <Button variant="ghost" size="icon" onClick={toggleSidebar}>
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium">{user?.name ?? "-"}</p>
          <p className="text-xs text-muted-foreground">{user?.email ?? "-"}</p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          disabled={isPending}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}