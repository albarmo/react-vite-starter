import { useUiStore } from "@/app/store/ui.store";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/cn";
import { ChevronsLeftRight } from "lucide-react";
import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { AppSectionNavbar } from "./app-section-navbar";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

type ProtectedLayoutProps = {
  children?: ReactNode;
};

export function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const setSidebarOpen = useUiStore((state) => state.setSidebarOpen);

  return (
    <div className="h-screen overflow-hidden bg-grey-20 text-foreground">
      <Topbar />
      <AppSectionNavbar />
      <div className="relative flex h-[calc(100svh-6.5rem)] min-h-[calc(100svh-6.5rem)]">
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
            "fixed top-[6.5rem] bottom-0 left-0 z-40 w-screen transition-transform duration-200 md:relative md:inset-y-0 md:z-auto md:w-auto md:translate-x-0",
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0",
          )}
        >
          <Sidebar />
        </div>

        <Button
          type="button"
          onClick={toggleSidebar}
          className={cn(
            "absolute top-24 z-20 hidden size-9 -translate-x-1/2 items-center justify-center rounded-xl border border-border bg-neutral-100 text-grey-100 shadow-sm transition-colors hover:bg-white md:inline-flex",
            sidebarOpen ? "left-68" : "left-20",
          )}
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <ChevronsLeftRight className="size-4" />
        </Button>

        <main className="min-w-0 flex-1 overflow-y-auto bg-grey-20 px-3 py-4 sm:px-4 sm:py-6 md:px-0 md:py-5">
          <div className="mx-auto w-full max-w-310">
            {children ?? <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
}
