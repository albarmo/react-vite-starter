import type { ReactElement } from "react";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedLayout } from "@/app/layouts/protected-layout";
import { AuthLayout } from "@/app/layouts/auth-layout";
import { PERMISSIONS, type AppPermission } from "@/app/config/permissions";
import { LoginPage } from "@/features/auth/pages/login-page";
import { BibliographicListPage } from "@/features/bibliographic/pages/bibliographic-list-page";
import { BibliographicPage } from "@/features/bibliographic/pages/bibliographic-page";
import { CirculationPage } from "@/features/circulation/pages/circulation-page";
import { DashboardPage } from "@/features/dashboard/pages/dashboard-page";
import { MasterFilePage } from "@/features/master-file/pages/master-file-page";
import { MembershipPage } from "@/features/membership/pages/membership-page";
import { ReportingPage } from "@/features/reporting/pages/reporting-page";
import { NotFoundPage } from "@/shared/components/common/screens/not-found-page";
import { UnauthorizedPage } from "@/shared/components/common/screens/unauthorized-page";
import { usePermission } from "@/shared/hooks/use-permission";
import { PermissionGuard } from "./permission-guard";
import { ProtectedRoute } from "./protected-route";
import { PublicRoute } from "./public-route";

const bibliographicRoutes = [
  { path: "bibliographic", element: <BibliographicPage /> },
  { path: "bibliographic/list", element: <BibliographicListPage /> },
  { path: "bibliographic/copy-cataloging", element: <BibliographicPage /> },
  { path: "bibliographic/labels-printing", element: <BibliographicPage /> },
  { path: "bibliographic/item-barcode-printing", element: <BibliographicPage /> },
];

const masterFileRoutes = [
  { path: "master-file", element: <MasterFilePage /> },
  { path: "master-file/authority-files/gmd", element: <MasterFilePage /> },
  { path: "master-file/authority-files/content-type", element: <MasterFilePage /> },
  { path: "master-file/authority-files/media-type", element: <MasterFilePage /> },
  { path: "master-file/authority-files/carrier-type", element: <MasterFilePage /> },
  { path: "master-file/authority-files/publisher", element: <MasterFilePage /> },
  { path: "master-file/authority-files/supplier", element: <MasterFilePage /> },
  { path: "master-file/authority-files/author", element: <MasterFilePage /> },
  { path: "master-file/authority-files/subject", element: <MasterFilePage /> },
  { path: "master-file/authority-files/location", element: <MasterFilePage /> },
  { path: "master-file/look-up-files", element: <MasterFilePage /> },
  { path: "master-file/tools", element: <MasterFilePage /> },
];

function withPermission(permission: AppPermission, element: ReactElement) {
  return (
    <PermissionGuard permission={permission} fallback={<Navigate to="/403" replace />}>
      {element}
    </PermissionGuard>
  );
}

function HomeRoute() {
  const canViewDashboard = usePermission(PERMISSIONS.DASHBOARD_VIEW);
  const canViewBibliographic = usePermission(PERMISSIONS.BIBLIOGRAPHIC_READ);
  const canViewMembership = usePermission(PERMISSIONS.MEMBERSHIP_READ);
  const canViewCirculation = usePermission(PERMISSIONS.CIRCULATION_READ);
  const canViewReporting = usePermission(PERMISSIONS.REPORTING_READ);
  const canViewMasterFile = usePermission(PERMISSIONS.MASTER_FILE_READ);

  if (canViewDashboard) {
    return <DashboardPage />;
  }

  if (canViewBibliographic) {
    return <Navigate to="/bibliographic/list" replace />;
  }

  if (canViewMembership) {
    return <Navigate to="/membership" replace />;
  }

  if (canViewCirculation) {
    return <Navigate to="/circulation" replace />;
  }

  if (canViewReporting) {
    return <Navigate to="/reporting" replace />;
  }

  if (canViewMasterFile) {
    return <Navigate to="/master-file/authority-files/gmd" replace />;
  }

  return <Navigate to="/403" replace />;
}

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <ProtectedLayout />,
        children: [
          {
            index: true,
            element: <HomeRoute />,
          },
          ...bibliographicRoutes.map((route) => ({
            path: route.path,
            element: withPermission(PERMISSIONS.BIBLIOGRAPHIC_READ, route.element),
          })),
          {
            path: "membership",
            element: withPermission(PERMISSIONS.MEMBERSHIP_READ, <MembershipPage />),
          },
          {
            path: "circulation",
            element: withPermission(PERMISSIONS.CIRCULATION_READ, <CirculationPage />),
          },
          {
            path: "reporting",
            element: withPermission(PERMISSIONS.REPORTING_READ, <ReportingPage />),
          },
          ...masterFileRoutes.map((route) => ({
            path: route.path,
            element: withPermission(PERMISSIONS.MASTER_FILE_READ, route.element),
          })),
          {
            path: "*",
            element: <NotFoundPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/403",
    element: <UnauthorizedPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
