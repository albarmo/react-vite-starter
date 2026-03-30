import { LIBRARY_ROUTE_PATHS } from "@/app/config/library-route-paths";
import { PERMISSIONS, type AppPermission } from "@/app/config/permissions";
import { useAuthStore } from "@/app/store/auth.store";
import { useUiStore } from "@/app/store/ui.store";
import { cn } from "@/shared/lib/cn";
import { BookOpen, Bookmark, ChevronDown, ChevronRight } from "lucide-react";
import type React from "react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";

type SidebarSubItem = {
  id: string;
  label: string;
  to: string;
  permission?: AppPermission;
};

type SidebarGroup = {
  id: string;
  label: string;
  to: string;
  items?: SidebarSubItem[];
  collapsible?: boolean;
  permission?: AppPermission;
};

type SidebarItem = {
  id: string;
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  permission?: AppPermission;
  groups?: SidebarGroup[];
};

const BIBLIOGRAPHY_GROUPS: SidebarSubItem[] = [
  {
    id: "list",
    label: "List",
    to: LIBRARY_ROUTE_PATHS.bibliographic.list,
  },
  {
    id: "copy-cataloging",
    label: "Copy Cataloging",
    to: LIBRARY_ROUTE_PATHS.bibliographic.copyCataloging,
  },
];

const LIBRARY_GROUPS: SidebarGroup[] = [
  {
    id: "bibliographic",
    label: "Bibliography",
    to: LIBRARY_ROUTE_PATHS.bibliographic.root,
    permission: PERMISSIONS.BIBLIOGRAPHIC_READ,
    items: BIBLIOGRAPHY_GROUPS,
    collapsible: true,
  },
  {
    id: "circulation",
    label: "Circulation",
    to: LIBRARY_ROUTE_PATHS.circulation,
    permission: PERMISSIONS.CIRCULATION_READ,
  },
  {
    id: "stock-take",
    label: "Stock Take",
    to: LIBRARY_ROUTE_PATHS.stockTake,
    permission: PERMISSIONS.STOCK_TAKE_READ,
  },
  {
    id: "report",
    label: "Report",
    to: LIBRARY_ROUTE_PATHS.report,
    permission: PERMISSIONS.REPORTING_READ,
  },
  {
    id: "book-requests",
    label: "Book Requests",
    to: LIBRARY_ROUTE_PATHS.bookRequests.root,
    permission: PERMISSIONS.BIBLIOGRAPHIC_READ,
  },
];

const AUTHORITY_FILE_ITEMS: SidebarSubItem[] = [
  { id: "gmd", label: "GMD", to: "/master-file/authority-files/gmd" },
  {
    id: "content-type",
    label: "Content Type",
    to: "/master-file/authority-files/content-type",
  },
  {
    id: "media-type",
    label: "Media Type",
    to: "/master-file/authority-files/media-type",
  },
  {
    id: "carrier-type",
    label: "Carrier Type",
    to: "/master-file/authority-files/carrier-type",
  },
  {
    id: "publisher",
    label: "Publisher",
    to: "/master-file/authority-files/publisher",
  },
  {
    id: "supplier",
    label: "Supplier",
    to: "/master-file/authority-files/supplier",
  },
  { id: "author", label: "Author", to: "/master-file/authority-files/author" },
  {
    id: "subject",
    label: "Subject",
    to: "/master-file/authority-files/subject",
  },
  {
    id: "location",
    label: "Location",
    to: "/master-file/authority-files/location",
  },
];

const LOOKUP_FILE_ITEMS: SidebarSubItem[] = [
  { id: "place", label: "Place", to: "/master-file/look-up-files/place" },
  {
    id: "item-status",
    label: "Item Status",
    to: "/master-file/look-up-files/item-status",
  },
  {
    id: "collection-type",
    label: "Collection Type",
    to: "/master-file/look-up-files/collection-type",
  },
  {
    id: "doc-language",
    label: "Doc. Language",
    to: "/master-file/look-up-files/doc-language",
  },
  { id: "label", label: "Label", to: "/master-file/look-up-files/label" },
  {
    id: "frequency",
    label: "Frequency",
    to: "/master-file/look-up-files/frequency",
  },
];

const TOOLS_ITEMS: SidebarSubItem[] = [
  {
    id: "cataloging-servers",
    label: "Cataloging Servers",
    to: "/master-file/tools/cataloging-servers",
  },
  {
    id: "item-code-pattern",
    label: "Item Code Pattern",
    to: "/master-file/tools/item-code-pattern",
  },
];

const MASTER_FILE_GROUPS: SidebarGroup[] = [
  {
    id: "authority-files",
    label: "Authority Files",
    to: "/master-file/authority-files",
    items: AUTHORITY_FILE_ITEMS,
    collapsible: true,
  },
  {
    id: "look-up-files",
    label: "Look Up Files",
    to: "/master-file/look-up-files",
    items: LOOKUP_FILE_ITEMS,
    collapsible: true,
  },
  {
    id: "tools",
    label: "Tools",
    to: "/master-file/tools",
    items: TOOLS_ITEMS,
    collapsible: true,
  },
];

const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    id: "library",
    label: "Library",
    to: LIBRARY_ROUTE_PATHS.root,
    icon: BookOpen,
    groups: LIBRARY_GROUPS,
  },
  // {
  //   id: "bibliographic",
  //   label: "Bibliography",
  //   to: "/bibliographic",
  //   icon: BookOpen,
  //   permission: PERMISSIONS.BIBLIOGRAPHIC_READ,
  //   groups: BIBLIOGRAPHY_GROUPS,
  // },
  {
    id: "master-file",
    label: "Master File",
    to: "/master-file",
    icon: Bookmark,
    permission: PERMISSIONS.MASTER_FILE_READ,
    groups: MASTER_FILE_GROUPS,
  },
];

const EMPTY_PERMISSIONS: ReadonlyArray<AppPermission> = [];
const DEFAULT_EXPANDED_GROUPS: Record<string, boolean> = {
  [getGroupStateKey("master-file", "authority-files")]: true,
};

const FLYOUT_WIDTH = 288;
const FLYOUT_GAP = 8;
const VIEWPORT_MARGIN = 12;
const HOVER_CLOSE_DELAY = 120;

function getGroupStateKey(itemId: string, groupId: string) {
  return `${itemId}:${groupId}`;
}

function normalizePath(pathname: string) {
  return pathname.replace(/\/+$/, "") || "/";
}

function isPathActive(pathname: string, targetPath: string) {
  const normalizedPath = normalizePath(pathname);
  const normalizedTargetPath = normalizePath(targetPath);

  return (
    normalizedPath === normalizedTargetPath ||
    normalizedPath.startsWith(`${normalizedTargetPath}/`)
  );
}

function getDefaultSubKey(item: SidebarItem) {
  const firstGroup = item.groups?.[0];
  if (!firstGroup) return null;
  return firstGroup.items?.[0]?.id ?? firstGroup.id;
}

function isItemRouteActive(item: SidebarItem, pathname: string) {
  return isPathActive(pathname, item.to);
}

function getItemActiveSubKey(item: SidebarItem, pathname: string) {
  if (!isItemRouteActive(item, pathname)) return null;

  for (const group of item.groups ?? []) {
    const activeSubItem = group.items?.find((subItem) =>
      isSubItemRouteActive(subItem, pathname),
    );

    if (activeSubItem) return activeSubItem.id;
    if (isGroupRouteActive(group, pathname)) return group.id;
  }

  return getDefaultSubKey(item);
}

function isGroupRouteActive(group: SidebarGroup, pathname: string) {
  return isPathActive(pathname, group.to);
}

function isSubItemRouteActive(subItem: SidebarSubItem, pathname: string) {
  return isPathActive(pathname, subItem.to);
}

function getMainItemClass(isActive: boolean) {
  return cn(
    "flex items-center gap-3 rounded-xl px-3.5 py-3 text-base transition-colors",
    isActive ? "bg-white/70 text-blue-70" : "text-grey-90 hover:bg-white/70",
  );
}

function getSubItemClass(isActive: boolean) {
  return isActive
    ? "bg-blue-20 text-primary"
    : "text-grey-90 hover:bg-white/70";
}

function getFlyoutTop(anchorRect: DOMRect, flyoutHeight: number) {
  const preferredTop = anchorRect.top;
  const maxTop = window.innerHeight - flyoutHeight - VIEWPORT_MARGIN;
  return Math.max(VIEWPORT_MARGIN, Math.min(preferredTop, maxTop));
}

export function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);
  const userPermissions = useAuthStore(
    (state) => state.user?.permissions ?? EMPTY_PERMISSIONS,
  );

  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>(
    {},
  );
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    DEFAULT_EXPANDED_GROUPS,
  );
  const [hoveredFlyoutItemId, setHoveredFlyoutItemId] = useState<string | null>(
    null,
  );
  const [flyoutAnchorPath, setFlyoutAnchorPath] = useState<string>("");

  const closeTimeoutRef = useRef<number | null>(null);

  const visibleItems = useMemo(
    () =>
      SIDEBAR_ITEMS.filter(
        (item) => !item.permission || userPermissions.includes(item.permission),
      )
        .map((item) => ({
          ...item,
          groups: item.groups?.filter(
            (group) =>
              !group.permission || userPermissions.includes(group.permission),
          ),
        }))
        .filter((item) => !item.groups || item.groups.length > 0),
    [userPermissions],
  );

  const clearCloseTimeout = useCallback(() => {
    if (!closeTimeoutRef.current) return;
    window.clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = null;
  }, []);

  const scheduleCloseFlyout = useCallback(() => {
    clearCloseTimeout();
    closeTimeoutRef.current = window.setTimeout(() => {
      setHoveredFlyoutItemId(null);
    }, HOVER_CLOSE_DELAY);
  }, [clearCloseTimeout]);

  const openFlyout = useCallback(
    (itemId: string) => {
      clearCloseTimeout();
      setHoveredFlyoutItemId(itemId);
      setFlyoutAnchorPath(pathname);
    },
    [clearCloseTimeout, pathname],
  );

  const closeFlyout = useCallback(() => {
    clearCloseTimeout();
    setHoveredFlyoutItemId(null);
    setFlyoutAnchorPath("");
  }, [clearCloseTimeout]);

  const toggleExpandedMenu = useCallback(
    (itemId: string, fallback: boolean) => {
      setExpandedMenus((prev) => ({
        ...prev,
        [itemId]: !(prev[itemId] ?? fallback),
      }));
    },
    [],
  );

  const toggleExpandedGroup = useCallback(
    (groupKey: string, fallback: boolean) => {
      setExpandedGroups((prev) => ({
        ...prev,
        [groupKey]: !(prev[groupKey] ?? fallback),
      }));
    },
    [],
  );

  useEffect(() => clearCloseTimeout, [clearCloseTimeout]);

  return (
    <aside
      className={cn(
        "hide-scrollbar h-full min-h-0 overflow-y-auto border-r border-border bg-grey-10 transition-all duration-200",
        sidebarOpen ? "w-screen md:w-68" : "w-screen md:w-20",
      )}
    >
      <nav
        className={cn(
          "space-y-1.5 pb-6",
          sidebarOpen ? "px-3 py-6" : "px-2 py-5",
        )}
      >
        {visibleItems.map((item) => {
          const groups = item.groups ?? [];
          const hasGroups = groups.length > 0;
          const isItemActive = isItemRouteActive(item, pathname);
          const activeSubKey = getItemActiveSubKey(item, pathname);
          const isMenuExpanded = expandedMenus[item.id] ?? isItemActive;
          const isFlyoutOpen =
            hoveredFlyoutItemId === item.id && flyoutAnchorPath === pathname;

          let itemTrigger: React.ReactNode;

          if (!sidebarOpen && hasGroups) {
            itemTrigger = (
              <CollapsedSidebarFlyoutTrigger
                item={item}
                groups={groups}
                pathname={pathname}
                activeSubKey={activeSubKey}
                isOpen={isFlyoutOpen}
                expandedGroups={expandedGroups}
                onOpenFlyout={() => openFlyout(item.id)}
                onScheduleCloseFlyout={scheduleCloseFlyout}
                onCloseFlyout={closeFlyout}
                onToggleGroup={toggleExpandedGroup}
              />
            );
          } else if (sidebarOpen && hasGroups) {
            itemTrigger = (
              <SidebarExpandableButton
                label={item.label}
                icon={item.icon}
                isActive={isItemActive}
                isExpanded={isMenuExpanded}
                onToggle={() => toggleExpandedMenu(item.id, isItemActive)}
              />
            );
          } else {
            itemTrigger = (
              <SidebarMainItem
                to={item.to}
                label={item.label}
                icon={item.icon}
                sidebarOpen={sidebarOpen}
                hasChildren={hasGroups}
              />
            );
          }

          return (
            <div key={item.id} className="relative">
              {itemTrigger}

              {sidebarOpen && hasGroups && isMenuExpanded && (
                <SidebarGroupsList
                  itemId={item.id}
                  groups={groups}
                  pathname={pathname}
                  activeSubKey={activeSubKey}
                  expandedGroups={expandedGroups}
                  onToggleGroup={toggleExpandedGroup}
                  className="space-y-1 pl-6"
                />
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

type SidebarExpandableButtonProps = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
  isExpanded: boolean;
  onToggle: () => void;
};

const SidebarExpandableButton = memo(function SidebarExpandableButton({
  label,
  icon: Icon,
  isActive,
  isExpanded,
  onToggle,
}: SidebarExpandableButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(getMainItemClass(isActive), "w-full justify-between")}
    >
      <span className="flex items-center gap-3">
        <Icon className="size-4 shrink-0" />
        <span>{label}</span>
      </span>
      {isExpanded ? (
        <ChevronDown className="size-4 shrink-0" />
      ) : (
        <ChevronRight className="size-4 shrink-0" />
      )}
    </button>
  );
});

type CollapsedSidebarFlyoutTriggerProps = {
  item: SidebarItem;
  groups: SidebarGroup[];
  pathname: string;
  activeSubKey: string | null;
  isOpen: boolean;
  expandedGroups: Record<string, boolean>;
  onOpenFlyout: () => void;
  onScheduleCloseFlyout: () => void;
  onCloseFlyout: () => void;
  onToggleGroup: (groupKey: string, fallback: boolean) => void;
};

const CollapsedSidebarFlyoutTrigger = memo(
  function CollapsedSidebarFlyoutTrigger({
    item,
    groups,
    pathname,
    activeSubKey,
    isOpen,
    expandedGroups,
    onOpenFlyout,
    onScheduleCloseFlyout,
    onCloseFlyout,
    onToggleGroup,
  }: CollapsedSidebarFlyoutTriggerProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const anchorRef = useRef<HTMLButtonElement | null>(null);
    const flyoutRef = useRef<HTMLDivElement | null>(null);
    const [flyoutPosition, setFlyoutPosition] = useState({ top: 0, left: 0 });

    const isItemActive = isItemRouteActive(item, pathname);

    const updateFlyoutPosition = useCallback(() => {
      if (!anchorRef.current || !flyoutRef.current) return;

      const anchorRect = anchorRef.current.getBoundingClientRect();
      const flyoutHeight = flyoutRef.current.offsetHeight;
      const rawLeft = anchorRect.right + FLYOUT_GAP;
      const maxLeft = window.innerWidth - FLYOUT_WIDTH - VIEWPORT_MARGIN;
      const left = Math.max(VIEWPORT_MARGIN, Math.min(rawLeft, maxLeft));
      const top = getFlyoutTop(anchorRect, flyoutHeight);

      setFlyoutPosition((prev) =>
        prev.top === top && prev.left === left ? prev : { top, left },
      );
    }, []);

    const handleMouseEnter = useCallback(() => {
      onOpenFlyout();
      window.requestAnimationFrame(updateFlyoutPosition);
    }, [onOpenFlyout, updateFlyoutPosition]);

    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;

        if (containerRef.current?.contains(target)) return;
        if (flyoutRef.current?.contains(target)) return;

        onCloseFlyout();
      };

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onCloseFlyout();
        }
      };

      const sidebarScrollContainer = anchorRef.current?.closest("aside");

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      window.addEventListener("resize", updateFlyoutPosition);
      window.addEventListener("scroll", updateFlyoutPosition, true);
      sidebarScrollContainer?.addEventListener("scroll", updateFlyoutPosition, {
        passive: true,
      });

      const rafId = window.requestAnimationFrame(updateFlyoutPosition);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
        window.removeEventListener("resize", updateFlyoutPosition);
        window.removeEventListener("scroll", updateFlyoutPosition, true);
        sidebarScrollContainer?.removeEventListener(
          "scroll",
          updateFlyoutPosition,
        );
        window.cancelAnimationFrame(rafId);
      };
    }, [isOpen, onCloseFlyout, updateFlyoutPosition]);

    useEffect(() => {
      if (!isOpen) return;
      const rafId = window.requestAnimationFrame(updateFlyoutPosition);
      return () => {
        window.cancelAnimationFrame(rafId);
      };
    }, [isOpen, item.id, expandedGroups, updateFlyoutPosition]);

    return (
      <div
        ref={containerRef}
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={onScheduleCloseFlyout}
      >
        <div className="group relative">
          <button
            ref={anchorRef}
            type="button"
            className={cn(
              getMainItemClass(isItemActive),
              "w-full justify-center",
            )}
            aria-expanded={isOpen}
            aria-haspopup="menu"
          >
            <item.icon className="size-4 shrink-0" />
          </button>

          <div
            className={cn(
              "pointer-events-none absolute top-1/2 left-full z-50 ml-3 -translate-y-1/2 rounded-lg bg-grey-100 px-2 py-1 text-sm font-medium text-white shadow-md",
              "whitespace-nowrap opacity-0 transition-all duration-150",
              !isOpen && "group-hover:translate-x-0 group-hover:opacity-100",
              !isOpen ? "translate-x-1" : "translate-x-0 opacity-0",
            )}
          >
            {item.label}
          </div>
        </div>

        {typeof document !== "undefined"
          ? createPortal(
              <div
                ref={flyoutRef}
                className={cn(
                  "fixed z-[45] w-72 rounded-2xl border border-border bg-white p-3 shadow-lg",
                  "origin-left transition-all duration-200 ease-out",
                  isOpen
                    ? "pointer-events-auto translate-x-0 opacity-100"
                    : "pointer-events-none -translate-x-2 opacity-0",
                )}
                style={{
                  left: flyoutPosition.left,
                  top: flyoutPosition.top,
                  width: FLYOUT_WIDTH,
                }}
                onMouseEnter={onOpenFlyout}
                onMouseLeave={onScheduleCloseFlyout}
              >
                <div className="mb-2 flex items-center gap-2 px-2 py-1">
                  <item.icon className="size-4 shrink-0 text-grey-90" />
                  <span className="text-base font-medium text-grey-100">
                    {item.label}
                  </span>
                </div>

                <SidebarGroupsList
                  itemId={item.id}
                  groups={groups}
                  pathname={pathname}
                  activeSubKey={activeSubKey}
                  expandedGroups={expandedGroups}
                  onToggleGroup={onToggleGroup}
                  onNavigate={onCloseFlyout}
                  className="space-y-1"
                />
              </div>,
              document.body,
            )
          : null}
      </div>
    );
  },
);

type SidebarGroupsListProps = {
  itemId: string;
  groups: SidebarGroup[];
  pathname: string;
  activeSubKey: string | null;
  expandedGroups: Record<string, boolean>;
  onToggleGroup: (groupKey: string, fallback: boolean) => void;
  onNavigate?: () => void;
  className?: string;
};

const SidebarGroupsList = memo(function SidebarGroupsList({
  itemId,
  groups,
  pathname,
  activeSubKey,
  expandedGroups,
  onToggleGroup,
  onNavigate,
  className,
}: SidebarGroupsListProps) {
  return (
    <div className={className}>
      {groups.map((group) => (
        <SidebarGroupRenderer
          key={group.id}
          itemId={itemId}
          group={group}
          pathname={pathname}
          activeSubKey={activeSubKey}
          expandedGroups={expandedGroups}
          onToggleGroup={onToggleGroup}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
});

type SidebarGroupRendererProps = {
  itemId: string;
  group: SidebarGroup;
  pathname: string;
  activeSubKey: string | null;
  expandedGroups: Record<string, boolean>;
  onToggleGroup: (groupKey: string, fallback: boolean) => void;
  onNavigate?: () => void;
};

const SidebarGroupRenderer = memo(function SidebarGroupRenderer({
  itemId,
  group,
  pathname,
  activeSubKey,
  expandedGroups,
  onToggleGroup,
  onNavigate,
}: SidebarGroupRendererProps) {
  const groupHasChildren = Boolean(group.items?.length);
  const groupStateKey = getGroupStateKey(itemId, group.id);

  const groupIsActive = groupHasChildren
    ? isGroupRouteActive(group, pathname)
    : activeSubKey === group.id;

  const isGroupExpanded = groupHasChildren
    ? (expandedGroups[groupStateKey] ?? groupIsActive)
    : false;

  if (groupHasChildren && group.collapsible) {
    return (
      <div className="space-y-1">
        <button
          type="button"
          onClick={() => onToggleGroup(groupStateKey, groupIsActive)}
          className={cn(
            "flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-base transition-colors",
            getSubItemClass(groupIsActive),
          )}
        >
          <span>{group.label}</span>
          {isGroupExpanded ? (
            <ChevronDown className="size-4" />
          ) : (
            <ChevronRight className="size-4" />
          )}
        </button>

        <div
          className={cn(
            "overflow-hidden transition-all duration-200 ease-out",
            isGroupExpanded ? "opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="space-y-1 py-1 pl-3">
            {group.items?.map((groupItem) => {
              const isSubItemActive = isSubItemRouteActive(groupItem, pathname);

              return (
                <Link
                  key={groupItem.id}
                  to={groupItem.to}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center rounded-xl px-4 py-2.5 text-base transition-colors",
                    getSubItemClass(isSubItemActive),
                  )}
                >
                  <span>{groupItem.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      to={group.to}
      onClick={onNavigate}
      className={cn(
        "flex items-center justify-between rounded-xl px-4 py-2.5 text-base transition-colors",
        getSubItemClass(groupIsActive),
      )}
    >
      <span>{group.label}</span>
    </Link>
  );
});

type SidebarMainItemProps = {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  sidebarOpen: boolean;
  hasChildren?: boolean;
};

const SidebarMainItem = memo(function SidebarMainItem({
  label,
  to,
  icon: Icon,
  sidebarOpen,
  hasChildren = false,
}: SidebarMainItemProps) {
  return (
    <div className={cn(!sidebarOpen && "group relative")}>
      <NavLink
        to={to}
        end={to === "/"}
        className={({ isActive }) =>
          cn(
            getMainItemClass(isActive),
            sidebarOpen ? "w-full justify-between" : "w-full justify-center",
          )
        }
      >
        <span className="flex items-center gap-3">
          <Icon className="size-4 shrink-0" />
          {sidebarOpen && <span>{label}</span>}
        </span>
        {sidebarOpen && hasChildren && (
          <ChevronRight className="size-4 shrink-0" />
        )}
      </NavLink>

      {!sidebarOpen && (
        <div
          className={cn(
            "pointer-events-none absolute top-1/2 left-full z-50 ml-3 -translate-y-1/2 rounded-lg bg-grey-100 px-2 py-1 text-sm font-medium text-white shadow-md",
            "whitespace-nowrap opacity-0 transition-all duration-150",
            "translate-x-1 group-hover:translate-x-0 group-hover:opacity-100",
          )}
        >
          {label}
        </div>
      )}
    </div>
  );
});
