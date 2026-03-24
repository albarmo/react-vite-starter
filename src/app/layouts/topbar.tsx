import { AppAvatarDropdown } from "@/app/layouts/app-avatar-dropdown";
import { AppNotifications } from "@/app/layouts/app-notifications";
import { useAuthStore } from "@/app/store/auth.store";
import { useUiStore } from "@/app/store/ui.store";
import { useLogout } from "@/features/auth/hooks/use-logout";
import { Button } from "@/shared/components/ui/button";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
    <header className="flex h-16 items-center justify-between border-b border-navbar-border bg-white px-3 sm:px-5">
      <section className="flex items-center gap-2.5">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="mr-0.5 md:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="size-5" />
        </Button>
        <img
          src="/images/logo-imigrasi.svg"
          alt="Logo Imigrasi"
          className="size-7 sm:size-8"
        />
        <img
          src="/images/logo-kemenimipas.svg"
          alt="Logo Kemenimipas"
          className="hidden size-8 sm:block"
        />
        <img
          src="/images/logo-perpustakaan-imigrasi.svg"
          alt="Logo Perpustakaan Imigrasi"
          className="hidden size-8 md:block"
        />
        <p className="ml-1 text-base font-medium tracking-wide text-blue-50 sm:text-lg md:text-xl">
          SLIMS
        </p>
      </section>

      <section className="flex items-center gap-2 text-grey-100 sm:gap-4">
        <AppNotifications />
        <AppAvatarDropdown
          user={user}
          isLoggingOut={isPending}
          onLogout={handleLogout}
        />
      </section>
    </header>
  );
}
