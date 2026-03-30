import { AppPageHeader } from "@/shared/components/common/app-page-header";
import { DataTable } from "@/shared/components/common/data-table";
import { DataTableToolbar } from "@/shared/components/common/data-table-toolbar";
import { useTableParams } from "@/shared/hooks/use-table-params";
import { normalizeApiError } from "@/shared/lib/api-error";
import type { ColumnDef } from "@tanstack/react-table";
import { useMembers } from "../hooks/use-members";
import type { Member } from "../types/member.type";

const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "memberId",
    header: "Member ID",
  },
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "type",
    header: "Tipe",
  },
];

export function MembershipPage() {
  const { params, setSearch } = useTableParams({
    page: 1,
    perPage: 10,
    search: "",
  });

  const { data, isError, error } = useMembers(params);

  if (isError) {
    const normalized = normalizeApiError(error);

    return (
      <div>
        <AppPageHeader
          title="Membership"
          description="Kelola data anggota perpustakaan"
        />
        <div className="border-red-200 text-red-600 rounded-xl border bg-red-50 p-4 text-base">
          {normalized.message}
        </div>
      </div>
    );
  }

  return (
    <div>
      <AppPageHeader
        title="Membership"
        description="Kelola data anggota perpustakaan"
      />

      <DataTableToolbar
        searchValue={params.search ?? ""}
        onSearchChange={setSearch}
        placeholder="Cari nama, email, atau member ID..."
      />

      <DataTable columns={columns} data={data?.data ?? []} />
    </div>
  );
}
