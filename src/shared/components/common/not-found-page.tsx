import { Link } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md space-y-4">
        <p className="text-sm font-medium text-muted-foreground">404</p>
        <h1 className="text-3xl font-bold tracking-tight">
          Halaman tidak ditemukan
        </h1>
        <p className="text-sm text-muted-foreground">
          Halaman yang Anda cari tidak tersedia atau mungkin sudah dipindahkan.
        </p>

        <div className="pt-2">
          <Button asChild>
            <Link to="/">Kembali ke Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}