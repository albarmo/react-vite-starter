"use client";

import { cn } from "@/shared/lib/cn";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const APP_SECTION_ITEMS = [
  { id: "library", label: "Library" },
  { id: "gallery", label: "Gallery" },
  { id: "archive", label: "Archive" },
  { id: "museum", label: "Museum" },
] as const;

function getActiveSection(pathname: string) {
  if (pathname.startsWith("/gallery")) return "gallery";
  if (pathname.startsWith("/archive")) return "archive";
  if (pathname.startsWith("/museum")) return "museum";
  return "library";
}

export function AppSectionNavbar() {
  const { pathname } = useLocation();

  const activeSection = useMemo(() => getActiveSection(pathname), [pathname]);

  return (
    <nav className="border-b border-grey-30 bg-white">
      <div className="flex min-h-10 items-end overflow-x-auto">
        {APP_SECTION_ITEMS.map((item) => {
          const isActive = item.id === activeSection;

          return (
            <button
              key={item.id}
              type="button"
              className={cn(
                "relative h-10 shrink-0 border-b-2 px-3 text-base transition-colors",
                isActive
                  ? "border-blue-50 font-medium text-grey-100"
                  : "border-transparent text-grey-70 hover:text-grey-100",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
