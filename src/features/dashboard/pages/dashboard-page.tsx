import { AppPageHeader } from "@/shared/components/common/app-page-header";
import { DashboardCardsSection } from "../components/dashboard-cards-section";
import { useDashboardSummary } from "../hooks/use-dashboard-summary";
import { normalizeApiError } from "@/shared/lib/api-error";
import { PERMISSIONS } from "@/app/config/permissions";
import { PermissionGuard } from "@/app/router/permission-guard";

export function DashboardPage() {
  const { data, isLoading, isError, error } = useDashboardSummary();

  if (isError) {
    const normalized = normalizeApiError(error);

    return (
      <div>
        <AppPageHeader
          title="Dashboard"
          description="Ringkasan statistik dan insight perpustakaan"
        />
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {normalized.message}
        </div>
      </div>
    );
  }

  const items = [
    {
      title: "Total Koleksi Buku",
      value: isLoading ? "..." : (data?.totalCollections ?? 0),
      description: "Total seluruh bibliografi",
    },
    {
      title: "Total Item",
      value: isLoading ? "..." : (data?.totalItems ?? 0),
      description: "Seluruh item fisik dan koleksi",
    },
    {
      title: "Jumlah Anggota",
      value: isLoading ? "..." : (data?.totalMembers ?? 0),
      description: "Member aktif terdaftar",
    },
    {
      title: "Loan Aktif",
      value: isLoading ? "..." : (data?.activeLoans ?? 0),
      description: "Sedang dipinjam saat ini",
    },
  ];

  return (
    <div>
      <AppPageHeader
        title="Dashboard"
        description="Ringkasan statistik dan insight perpustakaan"
      />
      <PermissionGuard permission={PERMISSIONS.MEMBERSHIP_CREATE}>
        <DashboardCardsSection items={items} />
      </PermissionGuard>
    </div>
  );
}
