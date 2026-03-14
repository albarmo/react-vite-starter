import { useUiStore } from "@/app/store/ui.store";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/cn";
import { Bell, ChevronsLeftRight, CircleUserRound, Menu } from "lucide-react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";

export function ProtectedLayout() {
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const setSidebarOpen = useUiStore((state) => state.setSidebarOpen);

  return (
    <div className="h-screen overflow-hidden bg-grey-20 text-foreground">
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
          <p className="ml-1 text-sm font-medium tracking-wide text-blue-50 sm:text-lg md:text-xl">
            SLIMS
          </p>
        </section>

        <section className="flex items-center gap-2 text-grey-100 sm:gap-4">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-1 transition-colors hover:bg-neutral-200"
            aria-label="Notifications"
          >
            <Bell className="size-5" />
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-1 transition-colors hover:bg-neutral-200"
            aria-label="Profile"
          >
            <CircleUserRound className="size-9 text-grey-80 sm:size-11" />
          </button>
        </section>
      </header>

      <div className="relative flex h-[calc(100svh-4rem)] min-h-[calc(100svh-4rem)]">
        {sidebarOpen && (
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black/35 md:hidden"
          />
        )}

        <div
          className={cn(
            "fixed inset-y-16 left-0 z-40 w-screen transition-transform duration-200 md:relative md:inset-y-0 md:z-auto md:w-auto md:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          )}
        >
          <Sidebar />
        </div>

        <Button
          type="button"
          onClick={toggleSidebar}
          className={cn(
            "absolute top-32 z-20 hidden size-9 -translate-x-1/2 items-center justify-center rounded-xl border border-border bg-neutral-100 text-grey-100 shadow-sm transition-colors hover:bg-white md:inline-flex",
            sidebarOpen ? "left-68" : "left-20",
          )}
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <ChevronsLeftRight className="size-4" />
        </Button>

        <main className="min-w-0 flex-1 overflow-y-auto bg-neutral-200 px-3 py-4 sm:px-4 sm:py-6 md:px-8 md:py-9">
          <div className="mx-auto w-full max-w-[1240px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
