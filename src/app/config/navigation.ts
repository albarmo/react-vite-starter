import {
  BookOpen,
  Database,
  FileBarChart2,
  LayoutDashboard,
  PackageSearch,
  Repeat,
  Users,
} from "lucide-react";
import { PERMISSIONS, type AppPermission } from "./permissions";

export type NavigationItem = {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  permission?: AppPermission;
};

export const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    to: "/",
    icon: LayoutDashboard,
    permission: PERMISSIONS.DASHBOARD_VIEW,
  },
  {
    label: "Bibliographic",
    to: "/bibliographic",
    icon: BookOpen,
    permission: PERMISSIONS.BIBLIOGRAPHIC_READ,
  },
  {
    label: "Membership",
    to: "/membership",
    icon: Users,
    permission: PERMISSIONS.MEMBERSHIP_READ,
  },
  {
    label: "Circulation",
    to: "/circulation",
    icon: Repeat,
    permission: PERMISSIONS.CIRCULATION_READ,
  },
  {
    label: "Reporting",
    to: "/reporting",
    icon: FileBarChart2,
    permission: PERMISSIONS.REPORTING_READ,
  },
  {
    label: "Master File",
    to: "/master-file",
    icon: Database,
    permission: PERMISSIONS.MASTER_FILE_READ,
  },
  {
    label: "Stock Take",
    to: "/stock-take",
    icon: PackageSearch,
    permission: PERMISSIONS.STOCK_TAKE_READ,
  },
];