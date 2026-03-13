import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute } from "./protected-route";
import { PublicRoute } from "./public-route";
import { ProtectedLayout } from "@/app/layouts/protected-layout";
import { AuthLayout } from "@/app/layouts/auth-layout";
import { LoginPage } from "@/features/auth/pages/login-page";
import { DashboardPage } from "@/features/dashboard/pages/dashboard-page";
import { BibliographicPage } from "@/features/bibliographic/pages/bibliographic-page";
import { MembershipPage } from "@/features/membership/pages/membership-page";
import { CirculationPage } from "@/features/circulation/pages/circulation-page";
import { ReportingPage } from "@/features/reporting/pages/reporting-page";
import { MasterFilePage } from "@/features/master-file/pages/master-file-page";
import { UnauthorizedPage } from "@/shared/components/common/unauthorized-page";
import { NotFoundPage } from "@/shared/components/common/not-found-page";
import { PERMISSIONS } from "../config/permissions";

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
    element: <ProtectedRoute permission={PERMISSIONS.DASHBOARD_VIEW} />,
    children: [
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: "/",
            element: <DashboardPage />,
          },
          {
            path: "/bibliographic",
            element: <BibliographicPage />,
          },
          {
            path: "/membership",
            element: <MembershipPage />,
          },
          {
            path: "/circulation",
            element: <CirculationPage />,
          },
          {
            path: "/reporting",
            element: <ReportingPage />,
          },
          {
            path: "/master-file",
            element: <MasterFilePage />,
          },
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
