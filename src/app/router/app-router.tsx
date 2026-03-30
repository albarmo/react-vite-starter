import { LIBRARY_ROUTE_PATHS } from "@/app/config/library-route-paths";
import { PERMISSIONS, type AppPermission } from "@/app/config/permissions";
import { AuthLayout } from "@/app/layouts/auth-layout";
import { ProtectedLayout } from "@/app/layouts/protected-layout";
import { LoginPage } from "@/features/auth/pages/login-page";
import { BibliographicCopyCatalogingPage } from "@/features/protected/library/bibliographic/pages/bibliographic-copy-cataloging-page";
import { BibliographicCreatePage } from "@/features/protected/library/bibliographic/pages/bibliographic-create-page";
import { BibliographicDetailPage } from "@/features/protected/library/bibliographic/pages/bibliographic-detail-page";
import { BibliographicEditPage } from "@/features/protected/library/bibliographic/pages/bibliographic-edit-page";
import { BibliographicItemDetailPage } from "@/features/protected/library/bibliographic/pages/bibliographic-item-detail-page";
import { BibliographicItemEditPage } from "@/features/protected/library/bibliographic/pages/bibliographic-item-edit-page";
import { BibliographicListPage } from "@/features/protected/library/bibliographic/pages/bibliographic-list-page";
import { BookRequestDetailPage } from "@/features/protected/library/bibliographic/pages/book-request-detail-page";
import BookRequestsPage from "@/features/protected/library/bibliographic/pages/book-requests-page";
import { CirculationPage } from "@/features/protected/library/circulation/pages/circulation-page";
import { DashboardPage } from "@/features/protected/library/dashboard/pages/dashboard-page";
import { AuthorCreatePage } from "@/features/protected/library/master-file/authority-files/pages/author-create-page";
import { AuthorDetailPage } from "@/features/protected/library/master-file/authority-files/pages/author-detail-page";
import { AuthorEditPage } from "@/features/protected/library/master-file/authority-files/pages/author-edit-page";
import { AuthorPage } from "@/features/protected/library/master-file/authority-files/pages/author-page";
import { CarrierTypeCreatePage } from "@/features/protected/library/master-file/authority-files/pages/carrier-type-create-page";
import { CarrierTypeEditPage } from "@/features/protected/library/master-file/authority-files/pages/carrier-type-edit-page";
import { CarrierTypePage } from "@/features/protected/library/master-file/authority-files/pages/carrier-type-page";
import { ContentTypeCreatePage } from "@/features/protected/library/master-file/authority-files/pages/content-type-create-page";
import { ContentTypeDetailPage } from "@/features/protected/library/master-file/authority-files/pages/content-type-detail-page";
import { ContentTypeEditPage } from "@/features/protected/library/master-file/authority-files/pages/content-type-edit-page";
import ContentTypePage from "@/features/protected/library/master-file/authority-files/pages/content-type-page";
import { CrossReferenceCreatePage } from "@/features/protected/library/master-file/authority-files/pages/cross-reference-create-page";
import { CrossReferenceDetailPage } from "@/features/protected/library/master-file/authority-files/pages/cross-reference-detail-page";
import { CrossReferenceEditPage } from "@/features/protected/library/master-file/authority-files/pages/cross-reference-edit-page";
import { GeneralMaterialDesignationCreatePage } from "@/features/protected/library/master-file/authority-files/pages/general-material-designation-create-page";
import { GeneralMaterialDesignationDetailPage } from "@/features/protected/library/master-file/authority-files/pages/general-material-designation-detail-page";
import { GeneralMaterialDesignationEditPage } from "@/features/protected/library/master-file/authority-files/pages/general-material-designation-edit-page";
import { GeneralMaterialDesignationPage } from "@/features/protected/library/master-file/authority-files/pages/general-material-designation-page";
import { LocationCreatePage } from "@/features/protected/library/master-file/authority-files/pages/location-create-page";
import { LocationDetailPage } from "@/features/protected/library/master-file/authority-files/pages/location-detail-page";
import { LocationEditPage } from "@/features/protected/library/master-file/authority-files/pages/location-edit-page";
import LocationPage from "@/features/protected/library/master-file/authority-files/pages/location-page";
import { MasterFilePage } from "@/features/protected/library/master-file/authority-files/pages/master-file-page";
import { MediaTypeCreatePage } from "@/features/protected/library/master-file/authority-files/pages/media-type-create-page";
import { MediaTypeEditPage } from "@/features/protected/library/master-file/authority-files/pages/media-type-edit-page";
import { MediaTypePage } from "@/features/protected/library/master-file/authority-files/pages/media-type-page";
import { PublisherCreatePage } from "@/features/protected/library/master-file/authority-files/pages/publisher-create-page";
import { PublisherDetailPage } from "@/features/protected/library/master-file/authority-files/pages/publisher-detail-page";
import { PublisherEditPage } from "@/features/protected/library/master-file/authority-files/pages/publisher-edit-page";
import { PublisherPage } from "@/features/protected/library/master-file/authority-files/pages/publisher-page";
import { SubjectCreatePage } from "@/features/protected/library/master-file/authority-files/pages/subject-create-page";
import { SubjectDetailPage } from "@/features/protected/library/master-file/authority-files/pages/subject-detail-page";
import { SubjectEditPage } from "@/features/protected/library/master-file/authority-files/pages/subject-edit-page";
import SubjectPage from "@/features/protected/library/master-file/authority-files/pages/subject-page";
import { SupplierCreatePage } from "@/features/protected/library/master-file/authority-files/pages/supplier-create-page";
import { SupplierDetailPage } from "@/features/protected/library/master-file/authority-files/pages/supplier-detail-page";
import { SupplierEditPage } from "@/features/protected/library/master-file/authority-files/pages/supplier-edit-page";
import { SupplierPage } from "@/features/protected/library/master-file/authority-files/pages/supplier-page";
import { CollectionTypeCreatePage } from "@/features/protected/library/master-file/lookup-files/pages/collection-type-create-page";
import { CollectionTypeDetailPage } from "@/features/protected/library/master-file/lookup-files/pages/collection-type-detail-page";
import { CollectionTypeEditPage } from "@/features/protected/library/master-file/lookup-files/pages/collection-type-edit-page";
import CollectionTypePage from "@/features/protected/library/master-file/lookup-files/pages/collection-type-page";
import { DocLanguageCreatePage } from "@/features/protected/library/master-file/lookup-files/pages/doc-language-create-page";
import { DocLanguageDetailPage } from "@/features/protected/library/master-file/lookup-files/pages/doc-language-detail-page";
import { DocLanguageEditPage } from "@/features/protected/library/master-file/lookup-files/pages/doc-language-edit-page";
import DocLanguagePage from "@/features/protected/library/master-file/lookup-files/pages/doc-language-page";
import { FrequencyCreatePage } from "@/features/protected/library/master-file/lookup-files/pages/frequency-create-page";
import { FrequencyDetailPage } from "@/features/protected/library/master-file/lookup-files/pages/frequency-detail-page";
import { FrequencyEditPage } from "@/features/protected/library/master-file/lookup-files/pages/frequency-edit-page";
import FrequencyPage from "@/features/protected/library/master-file/lookup-files/pages/frequency-page";
import { ItemStatusCreatePage } from "@/features/protected/library/master-file/lookup-files/pages/item-status-create-page";
import { ItemStatusDetailPage } from "@/features/protected/library/master-file/lookup-files/pages/item-status-detail-page";
import { ItemStatusEditPage } from "@/features/protected/library/master-file/lookup-files/pages/item-status-edit-page";
import ItemStatusPage from "@/features/protected/library/master-file/lookup-files/pages/item-status-page";
import { LabelCreatePage } from "@/features/protected/library/master-file/lookup-files/pages/label-create-page";
import { LabelDetailPage } from "@/features/protected/library/master-file/lookup-files/pages/label-detail-page";
import { LabelEditPage } from "@/features/protected/library/master-file/lookup-files/pages/label-edit-page";
import LabelPage from "@/features/protected/library/master-file/lookup-files/pages/label-page";
import LookupFilesPage from "@/features/protected/library/master-file/lookup-files/pages/lookup-files-page";
import { PlaceCreatePage } from "@/features/protected/library/master-file/lookup-files/pages/place-create-page";
import { PlaceDetailPage } from "@/features/protected/library/master-file/lookup-files/pages/place-detail-page";
import { PlaceEditPage } from "@/features/protected/library/master-file/lookup-files/pages/place-edit-page";
import { PlacePage } from "@/features/protected/library/master-file/lookup-files/pages/place-page";
import { CatalogingServerCreatePage } from "@/features/protected/library/master-file/tools/pages/cataloging-server-create-page";
import { CatalogingServerEditPage } from "@/features/protected/library/master-file/tools/pages/cataloging-server-edit-page";
import { CatalogingServersDetailPage } from "@/features/protected/library/master-file/tools/pages/cataloging-servers-detail-page";
import CatalogingServersPage from "@/features/protected/library/master-file/tools/pages/cataloging-servers-page";
import { ItemCodePatternCreatePage } from "@/features/protected/library/master-file/tools/pages/item-code-pattern-create-page";
import { ItemCodePatternDetailPage } from "@/features/protected/library/master-file/tools/pages/item-code-pattern-detail-page";
import { ItemCodePatternEditPage } from "@/features/protected/library/master-file/tools/pages/item-code-pattern-edit-page";
import ItemCodePatternPage from "@/features/protected/library/master-file/tools/pages/item-code-pattern-page";
import { MembershipPage } from "@/features/protected/library/membership/pages/membership-page";
import { ReportingPage } from "@/features/protected/library/reporting/pages/reporting-page";
import { StockTakePage } from "@/features/protected/library/stock-take/pages/stock-take-page";
import { NotFoundPage } from "@/shared/components/common/screens/not-found-page";
import { RouteErrorPage } from "@/shared/components/common/screens/route-error-page";
import { UnauthorizedPage } from "@/shared/components/common/screens/unauthorized-page";
import { usePermission } from "@/shared/hooks/use-permission";
import type { ReactElement } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import { PermissionGuard } from "./permission-guard";
import { ProtectedRoute } from "./protected-route";
import { PublicRoute } from "./public-route";

function toRoutePath(pathname: string) {
  return pathname.replace(/^\//, "");
}

type ProtectedAppRoute = {
  path: string;
  element: ReactElement;
  permission?: AppPermission;
};

const libraryRoutes: ProtectedAppRoute[] = [
  {
    path: toRoutePath(LIBRARY_ROUTE_PATHS.root),
    element: <LibraryRoute />,
  },
  {
    path: toRoutePath(LIBRARY_ROUTE_PATHS.bibliographic.root),
    element: <PathRedirect to={LIBRARY_ROUTE_PATHS.bibliographic.list} />,
    permission: PERMISSIONS.BIBLIOGRAPHIC_READ,
  },
  {
    path: toRoutePath(LIBRARY_ROUTE_PATHS.bibliographic.list),
    element: <BibliographicListPage />,
    permission: PERMISSIONS.BIBLIOGRAPHIC_READ,
  },
  {
    path: toRoutePath(LIBRARY_ROUTE_PATHS.bibliographic.detail),
    element: <BibliographicDetailPage />,
    permission: PERMISSIONS.BIBLIOGRAPHIC_READ,
  },
  {
    path: toRoutePath(LIBRARY_ROUTE_PATHS.bibliographic.itemDetail),
    element: <BibliographicItemDetailPage />,
    permission: PERMISSIONS.BIBLIOGRAPHIC_READ,
  },
  {
    path: toRoutePath(LIBRARY_ROUTE_PATHS.bibliographic.itemEdit),
    element: <BibliographicItemEditPage />,
    permission: PERMISSIONS.BIBLIOGRAPHIC_READ,
  },
  {
    path: toRoutePath(LIBRARY_ROUTE_PATHS.bibliographic.create),
    element: <BibliographicCreatePage />,
    permission: PERMISSIONS.BIBLIOGRAPHIC_READ,
  },
  {
    path: toRoutePath(LIBRARY_ROUTE_PATHS.bibliographic.edit),
    element: <BibliographicEditPage />,
    permission: PERMISSIONS.BIBLIOGRAPHIC_READ,
  },
  {
    path: toRoutePath(LIBRARY_ROUTE_PATHS.bibliographic.copyCataloging),
    element: <BibliographicCopyCatalogingPage />,
    permission: PERMISSIONS.BIBLIOGRAPHIC_READ,
  },
  {
    path: toRoutePath(LIBRARY_ROUTE_PATHS.bookRequests.root),
    element: <BookRequestsPage />,
    permission: PERMISSIONS.BIBLIOGRAPHIC_READ,
  },
  {
    path: toRoutePath(LIBRARY_ROUTE_PATHS.bookRequests.detail),
    element: <BookRequestDetailPage />,
    permission: PERMISSIONS.BIBLIOGRAPHIC_READ,
  },
  {
    path: toRoutePath(LIBRARY_ROUTE_PATHS.circulation),
    element: <CirculationPage />,
    permission: PERMISSIONS.CIRCULATION_READ,
  },
  {
    path: toRoutePath(LIBRARY_ROUTE_PATHS.stockTake),
    element: <StockTakePage />,
    permission: PERMISSIONS.STOCK_TAKE_READ,
  },
  {
    path: toRoutePath(LIBRARY_ROUTE_PATHS.report),
    element: <ReportingPage />,
    permission: PERMISSIONS.REPORTING_READ,
  },
];

const masterFileRoutes = [
  {
    path: "master-file",
    element: <MasterFilePage />,
  },
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
  {
    path: "master-file/authority-files/supplier",
    element: <SupplierPage />,
  },
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
  {
    path: "master-file/authority-files/author",
    element: <AuthorPage />,
  },
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
  {
    path: "master-file/authority-files/subject",
    element: <SubjectPage />,
  },
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
  {
    path: "master-file/authority-files/location",
    element: <LocationPage />,
  },
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
  {
    path: "master-file/look-up-files",
    element: <LookupFilesPage />,
  },
  {
    path: "master-file/look-up-files/place",
    element: <PlacePage />,
  },
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
    element: <ItemStatusPage />,
  },
  {
    path: "master-file/look-up-files/item-status/create",
    element: <ItemStatusCreatePage />,
  },
  {
    path: "master-file/look-up-files/item-status/edit/:id",
    element: <ItemStatusEditPage />,
  },
  {
    path: "master-file/look-up-files/item-status/detail/:id",
    element: <ItemStatusDetailPage />,
  },
  {
    path: "master-file/look-up-files/collection-type",
    element: <CollectionTypePage />,
  },
  {
    path: "master-file/look-up-files/collection-type/create",
    element: <CollectionTypeCreatePage />,
  },
  {
    path: "master-file/look-up-files/collection-type/edit/:id",
    element: <CollectionTypeEditPage />,
  },
  {
    path: "master-file/look-up-files/collection-type/detail/:id",
    element: <CollectionTypeDetailPage />,
  },
  {
    path: "master-file/look-up-files/doc-language",
    element: <DocLanguagePage />,
  },
  {
    path: "master-file/look-up-files/doc-language/create",
    element: <DocLanguageCreatePage />,
  },
  {
    path: "master-file/look-up-files/doc-language/edit/:id",
    element: <DocLanguageEditPage />,
  },
  {
    path: "master-file/look-up-files/doc-language/detail/:id",
    element: <DocLanguageDetailPage />,
  },
  {
    path: "master-file/look-up-files/label",
    element: <LabelPage />,
  },
  {
    path: "master-file/look-up-files/label/create",
    element: <LabelCreatePage />,
  },
  {
    path: "master-file/look-up-files/label/edit/:id",
    element: <LabelEditPage />,
  },
  {
    path: "master-file/look-up-files/label/detail/:id",
    element: <LabelDetailPage />,
  },
  {
    path: "master-file/look-up-files/frequency",
    element: <FrequencyPage />,
  },
  {
    path: "master-file/look-up-files/frequency/create",
    element: <FrequencyCreatePage />,
  },
  {
    path: "master-file/look-up-files/frequency/detail/:id",
    element: <FrequencyDetailPage />,
  },
  {
    path: "master-file/look-up-files/frequency/edit/:id",
    element: <FrequencyEditPage />,
  },
  {
    path: "master-file/tools",
    element: <MasterFilePage />,
  },
  {
    path: "master-file/tools/cataloging-servers",
    element: <CatalogingServersPage />,
  },
  {
    path: "master-file/tools/cataloging-servers/create",
    element: <CatalogingServerCreatePage />,
  },
  {
    path: "master-file/tools/cataloging-servers/detail/:id",
    element: <CatalogingServersDetailPage />,
  },
  {
    path: "master-file/tools/cataloging-servers/edit/:id",
    element: <CatalogingServerEditPage />,
  },
  {
    path: "master-file/tools/item-code-pattern",
    element: <ItemCodePatternPage />,
  },
  {
    path: "master-file/tools/item-code-pattern/create",
    element: <ItemCodePatternCreatePage />,
  },
  {
    path: "master-file/tools/item-code-pattern/detail/:id",
    element: <ItemCodePatternDetailPage />,
  },
  {
    path: "master-file/tools/item-code-pattern/edit/:id",
    element: <ItemCodePatternEditPage />,
  },
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
  const canViewStockTake = usePermission(PERMISSIONS.STOCK_TAKE_READ);
  const canViewMasterFile = usePermission(PERMISSIONS.MASTER_FILE_READ);

  if (canViewDashboard) {
    return <DashboardPage />;
  }

  if (canViewBibliographic) {
    return <Navigate to={LIBRARY_ROUTE_PATHS.bibliographic.list} replace />;
  }

  if (canViewMembership) {
    return <Navigate to="/membership" replace />;
  }

  if (canViewCirculation) {
    return <Navigate to={LIBRARY_ROUTE_PATHS.circulation} replace />;
  }

  if (canViewStockTake) {
    return <Navigate to={LIBRARY_ROUTE_PATHS.stockTake} replace />;
  }

  if (canViewReporting) {
    return <Navigate to={LIBRARY_ROUTE_PATHS.report} replace />;
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

function PathRedirect({ to }: { to: string }) {
  const { search, hash } = useLocation();

  return <Navigate to={`${to}${search}${hash}`} replace />;
}

function LegacyBibliographicRedirect() {
  const { pathname, search, hash } = useLocation();

  const nextPath = pathname.startsWith("/bibliographic/book-requests")
    ? pathname.replace(
        "/bibliographic/book-requests",
        LIBRARY_ROUTE_PATHS.bookRequests.root,
      )
    : pathname.replace(
        "/bibliographic",
        LIBRARY_ROUTE_PATHS.bibliographic.root,
      );

  return <Navigate to={`${nextPath}${search}${hash}`} replace />;
}

function LibraryRoute() {
  const canViewBibliographic = usePermission(PERMISSIONS.BIBLIOGRAPHIC_READ);
  const canViewCirculation = usePermission(PERMISSIONS.CIRCULATION_READ);
  const canViewStockTake = usePermission(PERMISSIONS.STOCK_TAKE_READ);
  const canViewReporting = usePermission(PERMISSIONS.REPORTING_READ);

  if (canViewBibliographic) {
    return <Navigate to={LIBRARY_ROUTE_PATHS.bibliographic.list} replace />;
  }

  if (canViewCirculation) {
    return <Navigate to={LIBRARY_ROUTE_PATHS.circulation} replace />;
  }

  if (canViewStockTake) {
    return <Navigate to={LIBRARY_ROUTE_PATHS.stockTake} replace />;
  }

  if (canViewReporting) {
    return <Navigate to={LIBRARY_ROUTE_PATHS.report} replace />;
  }

  return <Navigate to="/403" replace />;
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
          ...libraryRoutes.map((route) => ({
            path: route.path,
            element: route.permission
              ? withPermission(route.permission, route.element)
              : route.element,
          })),
          {
            path: "bibliographic",
            element: withPermission(
              PERMISSIONS.BIBLIOGRAPHIC_READ,
              <LegacyBibliographicRedirect />,
            ),
          },
          {
            path: "bibliographic/*",
            element: withPermission(
              PERMISSIONS.BIBLIOGRAPHIC_READ,
              <LegacyBibliographicRedirect />,
            ),
          },
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
              <PathRedirect to={LIBRARY_ROUTE_PATHS.circulation} />,
            ),
          },
          {
            path: "reporting",
            element: withPermission(
              PERMISSIONS.REPORTING_READ,
              <PathRedirect to={LIBRARY_ROUTE_PATHS.report} />,
            ),
          },
          {
            path: "stock-take",
            element: withPermission(
              PERMISSIONS.STOCK_TAKE_READ,
              <PathRedirect to={LIBRARY_ROUTE_PATHS.stockTake} />,
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
