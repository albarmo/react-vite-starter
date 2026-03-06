import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { AppBreadcrumb } from "@/shared/components/common/app-breadcrumb";

export function AppShell() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 p-6">
          <div className="mb-4">
            <AppBreadcrumb />
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}