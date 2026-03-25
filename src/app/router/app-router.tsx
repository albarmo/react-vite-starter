import { PERMISSIONS, type AppPermission } from "@/app/config/permissions";
import { AuthLayout } from "@/app/layouts/auth-layout";
import { ProtectedLayout } from "@/app/layouts/protected-layout";
import { LoginPage } from "@/features/auth/pages/login-page";
import { BibliographicCopyCatalogingPage } from "@/features/bibliographic/pages/bibliographic-copy-cataloging-page";
import { BibliographicCreatePage } from "@/features/bibliographic/pages/bibliographic-create-page";
import { BibliographicDetailPage } from "@/features/bibliographic/pages/bibliographic-detail-page";
import { BibliographicEditPage } from "@/features/bibliographic/pages/bibliographic-edit-page";
import { BibliographicItemDetailPage } from "@/features/bibliographic/pages/bibliographic-item-detail-page";
import { BibliographicItemEditPage } from "@/features/bibliographic/pages/bibliographic-item-edit-page";
import { BibliographicListPage } from "@/features/bibliographic/pages/bibliographic-list-page";
import { BibliographicPage } from "@/features/bibliographic/pages/bibliographic-page";
import { CirculationPage } from "@/features/circulation/pages/circulation-page";
import { DashboardPage } from "@/features/dashboard/pages/dashboard-page";
import { AuthorCreatePage } from "@/features/master-file/pages/author-create-page";
import { AuthorDetailPage } from "@/features/master-file/pages/author-detail-page";
import { AuthorEditPage } from "@/features/master-file/pages/author-edit-page";
import { AuthorPage } from "@/features/master-file/pages/author-page";
import { CarrierTypeCreatePage } from "@/features/master-file/pages/carrier-type-create-page";
import { CarrierTypeEditPage } from "@/features/master-file/pages/carrier-type-edit-page";
import { CarrierTypePage } from "@/features/master-file/pages/carrier-type-page";
import { ContentTypeCreatePage } from "@/features/master-file/pages/content-type-create-page";
import { ContentTypeDetailPage } from "@/features/master-file/pages/content-type-detail-page";
import { ContentTypeEditPage } from "@/features/master-file/pages/content-type-edit-page";
import ContentTypePage from "@/features/master-file/pages/content-type-page";
import { CrossReferenceCreatePage } from "@/features/master-file/pages/cross-reference-create-page";
import { CrossReferenceDetailPage } from "@/features/master-file/pages/cross-reference-detail-page";
import { CrossReferenceEditPage } from "@/features/master-file/pages/cross-reference-edit-page";
import { GeneralMaterialDesignationCreatePage } from "@/features/master-file/pages/general-material-designation-create-page";
import { GeneralMaterialDesignationDetailPage } from "@/features/master-file/pages/general-material-designation-detail-page";
import { GeneralMaterialDesignationEditPage } from "@/features/master-file/pages/general-material-designation-edit-page";
import { GeneralMaterialDesignationPage } from "@/features/master-file/pages/general-material-designation-page";
import { LocationCreatePage } from "@/features/master-file/pages/location-create-page";
import { LocationDetailPage } from "@/features/master-file/pages/location-detail-page";
import { LocationEditPage } from "@/features/master-file/pages/location-edit-page";
import LocationPage from "@/features/master-file/pages/location-page";
import LookupFilesPage from "@/features/master-file/pages/lookup-files-page";
import { MasterFilePage } from "@/features/master-file/pages/master-file-page";
import { MediaTypeCreatePage } from "@/features/master-file/pages/media-type-create-page";
import { MediaTypeEditPage } from "@/features/master-file/pages/media-type-edit-page";
import { MediaTypePage } from "@/features/master-file/pages/media-type-page";
import { PlaceCreatePage } from "@/features/master-file/pages/place-create-page";
import { PlaceDetailPage } from "@/features/master-file/pages/place-detail-page";
import { PlaceEditPage } from "@/features/master-file/pages/place-edit-page";
import { PlacePage } from "@/features/master-file/pages/place-page";
import { PublisherCreatePage } from "@/features/master-file/pages/publisher-create-page";
import { PublisherDetailPage } from "@/features/master-file/pages/publisher-detail-page";
import { PublisherEditPage } from "@/features/master-file/pages/publisher-edit-page";
import { PublisherPage } from "@/features/master-file/pages/publisher-page";
import { SubjectCreatePage } from "@/features/master-file/pages/subject-create-page";
import { SubjectDetailPage } from "@/features/master-file/pages/subject-detail-page";
import { SubjectEditPage } from "@/features/master-file/pages/subject-edit-page";
import SubjectPage from "@/features/master-file/pages/subject-page";
import { SupplierCreatePage } from "@/features/master-file/pages/supplier-create-page";
import { SupplierDetailPage } from "@/features/master-file/pages/supplier-detail-page";
import { SupplierEditPage } from "@/features/master-file/pages/supplier-edit-page";
import { SupplierPage } from "@/features/master-file/pages/supplier-page";
import { MembershipPage } from "@/features/membership/pages/membership-page";
import { ReportingPage } from "@/features/reporting/pages/reporting-page";
import { NotFoundPage } from "@/shared/components/common/screens/not-found-page";
import { RouteErrorPage } from "@/shared/components/common/screens/route-error-page";
import { UnauthorizedPage } from "@/shared/components/common/screens/unauthorized-page";
import { usePermission } from "@/shared/hooks/use-permission";
import type { ReactElement } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { PermissionGuard } from "./permission-guard";
import { ProtectedRoute } from "./protected-route";
import { PublicRoute } from "./public-route";

const bibliographicRoutes = [
  { path: "bibliographic", element: <BibliographicPage /> },
  { path: "bibliographic/list", element: <BibliographicListPage /> },
  { path: "bibliographic/detail/:id", element: <BibliographicDetailPage /> },
  {
    path: "bibliographic/item/detail/:id",
    element: <BibliographicItemDetailPage />,
  },
  {
    path: "bibliographic/item/edit/:id",
    element: <BibliographicItemEditPage />,
  },
  { path: "bibliographic/create", element: <BibliographicCreatePage /> },
  { path: "bibliographic/edit/:id", element: <BibliographicEditPage /> },
  {
    path: "bibliographic/copy-cataloging",
    element: <BibliographicCopyCatalogingPage />,
  },
  { path: "bibliographic/labels-printing", element: <BibliographicPage /> },
  {
    path: "bibliographic/item-barcode-printing",
    element: <BibliographicPage />,
  },
];

const masterFileRoutes = [
  { path: "master-file", element: <MasterFilePage /> },
  {
    path: "master-file/authority-files/gmd",
    element: <GeneralMaterialDesignationPage />,
  },
  {
    path: "master-file/authority-files/gmd/create",
    element: <GeneralMaterialDesignationCreatePage />,
  },
  {
    path: "master-file/authority-files/gmd/edit/:id",
    element: <GeneralMaterialDesignationEditPage />,
  },
  {
    path: "master-file/authority-files/gmd/detail/:id",
    element: <GeneralMaterialDesignationDetailPage />,
  },
  {
    path: "master-file/authority-files/content-type",
    element: <ContentTypePage />,
  },
  {
    path: "master-file/authority-files/content-type/create",
    element: <ContentTypeCreatePage />,
  },
  {
    path: "master-file/authority-files/content-type/edit/:id",
    element: <ContentTypeEditPage />,
  },
  {
    path: "master-file/authority-files/content-type/detail/:id",
    element: <ContentTypeDetailPage />,
  },
  {
    path: "master-file/authority-files/media-type",
    element: <MediaTypePage />,
  },
  {
    path: "master-file/authority-files/media-type/create",
    element: <MediaTypeCreatePage />,
  },
  {
    path: "master-file/authority-files/media-type/edit/:id",
    element: <MediaTypeEditPage />,
  },
  {
    path: "master-file/authority-files/carrier-type",
    element: <CarrierTypePage />,
  },
  {
    path: "master-file/authority-files/carrier-type/create",
    element: <CarrierTypeCreatePage />,
  },
  {
    path: "master-file/authority-files/carrier-type/edit/:id",
    element: <CarrierTypeEditPage />,
  },
  {
    path: "master-file/authority-files/publisher",
    element: <PublisherPage />,
  },
  {
    path: "master-file/authority-files/publisher/create",
    element: <PublisherCreatePage />,
  },
  {
    path: "master-file/authority-files/publisher/edit/:id",
    element: <PublisherEditPage />,
  },
  {
    path: "master-file/authority-files/publisher/detail/:id",
    element: <PublisherDetailPage />,
  },
  { path: "master-file/authority-files/supplier", element: <SupplierPage /> },
  {
    path: "master-file/authority-files/supplier/create",
    element: <SupplierCreatePage />,
  },
  {
    path: "master-file/authority-files/supplier/edit/:id",
    element: <SupplierEditPage />,
  },
  {
    path: "master-file/authority-files/supplier/detail/:id",
    element: <SupplierDetailPage />,
  },
  { path: "master-file/authority-files/author", element: <AuthorPage /> },
  {
    path: "master-file/authority-files/author/create",
    element: <AuthorCreatePage />,
  },
  {
    path: "master-file/authority-files/author/edit/:id",
    element: <AuthorEditPage />,
  },
  {
    path: "master-file/authority-files/author/detail/:id",
    element: <AuthorDetailPage />,
  },
  { path: "master-file/authority-files/subject", element: <SubjectPage /> },
  {
    path: "master-file/authority-files/subject/create",
    element: <SubjectCreatePage />,
  },
  {
    path: "master-file/authority-files/subject/edit/:id",
    element: <SubjectEditPage />,
  },
  {
    path: "master-file/authority-files/subject/detail/:id",
    element: <SubjectDetailPage />,
  },
  {
    path: "master-file/authority-files/subject/cross-reference/create",
    element: <CrossReferenceCreatePage />,
  },
  {
    path: "master-file/authority-files/subject/cross-reference/edit/:id",
    element: <CrossReferenceEditPage />,
  },
  {
    path: "master-file/authority-files/subject/cross-reference/detail/:id",
    element: <CrossReferenceDetailPage />,
  },
  { path: "master-file/authority-files/location", element: <LocationPage /> },
  {
    path: "master-file/authority-files/location/create",
    element: <LocationCreatePage />,
  },
  {
    path: "master-file/authority-files/location/edit/:id",
    element: <LocationEditPage />,
  },
  {
    path: "master-file/authority-files/location/detail/:id",
    element: <LocationDetailPage />,
  },
  { path: "master-file/look-up-files", element: <LookupFilesPage /> },
  { path: "master-file/look-up-files/place", element: <PlacePage /> },
  {
    path: "master-file/look-up-files/place/create",
    element: <PlaceCreatePage />,
  },
  {
    path: "master-file/look-up-files/place/edit/:id",
    element: <PlaceEditPage />,
  },
  {
    path: "master-file/look-up-files/place/detail/:id",
    element: <PlaceDetailPage />,
  },
  {
    path: "master-file/look-up-files/item-status",
    element: <LookupFilesPage />,
  },
  {
    path: "master-file/look-up-files/collection-type",
    element: <LookupFilesPage />,
  },
  {
    path: "master-file/look-up-files/doc-language",
    element: <LookupFilesPage />,
  },
  { path: "master-file/look-up-files/label", element: <LookupFilesPage /> },
  { path: "master-file/look-up-files/frequency", element: <LookupFilesPage /> },
  { path: "master-file/tools", element: <MasterFilePage /> },
];

function withPermission(permission: AppPermission, element: ReactElement) {
  return (
    <PermissionGuard
      permission={permission}
      fallback={<Navigate to="/403" replace />}
    >
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

function AuthRouteErrorElement() {
  return (
    <AuthLayout>
      <RouteErrorPage />
    </AuthLayout>
  );
}

function ProtectedRouteErrorElement() {
  return (
    <ProtectedLayout>
      <RouteErrorPage embedded />
    </ProtectedLayout>
  );
}

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        element: <AuthLayout />,
        errorElement: <AuthRouteErrorElement />,
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
    errorElement: <RouteErrorPage />,
    children: [
      {
        element: <ProtectedLayout />,
        errorElement: <ProtectedRouteErrorElement />,
        children: [
          {
            index: true,
            element: <HomeRoute />,
          },
          ...bibliographicRoutes.map((route) => ({
            path: route.path,
            element: withPermission(
              PERMISSIONS.BIBLIOGRAPHIC_READ,
              route.element,
            ),
          })),
          {
            path: "membership",
            element: withPermission(
              PERMISSIONS.MEMBERSHIP_READ,
              <MembershipPage />,
            ),
          },
          {
            path: "circulation",
            element: withPermission(
              PERMISSIONS.CIRCULATION_READ,
              <CirculationPage />,
            ),
          },
          {
            path: "reporting",
            element: withPermission(
              PERMISSIONS.REPORTING_READ,
              <ReportingPage />,
            ),
          },
          ...masterFileRoutes.map((route) => ({
            path: route.path,
            element: withPermission(
              PERMISSIONS.MASTER_FILE_READ,
              route.element,
            ),
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
    errorElement: <RouteErrorPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
    errorElement: <RouteErrorPage />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
