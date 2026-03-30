"use client";

import { cn } from "@/shared/lib/cn";
import {
  APP_SECTION_ITEMS,
  type AppSectionId,
} from "./app-section-navbar.constants";

export type AppSectionNavbarProps = {
  activeSection: AppSectionId;
  onSectionChange: (section: AppSectionId) => void;
};

export function AppSectionNavbar({
  activeSection,
  onSectionChange,
}: AppSectionNavbarProps) {
  return (
    <nav className="border-b border-grey-30 bg-white" aria-label="App section">
      <div
        className="flex min-h-10 items-end overflow-x-auto"
        role="tablist"
        aria-orientation="horizontal"
      >
        {APP_SECTION_ITEMS.map((item) => {
          const isActive = item.id === activeSection;
          const tabId = `${item.id}-tab`;
          const panelId = `${item.id}-panel`;

          return (
            <button
              key={item.id}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "relative h-10 shrink-0 border-b-2 px-3 text-base transition-colors",
                isActive
                  ? "border-blue-50 font-medium text-grey-100"
                  : "border-transparent text-grey-70 hover:text-grey-100",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
