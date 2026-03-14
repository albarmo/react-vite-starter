import { Link } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";

export function UnauthorizedPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="max-w-md space-y-4">
        <p className="text-sm font-medium text-muted-foreground">403</p>
        <h1 className="text-3xl font-bold">Akses Ditolak</h1>
        <p className="text-sm text-muted-foreground">
          Anda tidak memiliki izin untuk mengakses halaman ini.
        </p>
        <Button asChild>
          <Link to="/">Kembali ke Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}