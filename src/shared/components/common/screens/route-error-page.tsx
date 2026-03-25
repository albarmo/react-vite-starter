import { MdUpwardCard } from "@/shared/components/common/md-upward-card";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/cn";
import { AlertTriangle, ArrowLeft, Home, RefreshCw } from "lucide-react";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

type RouteErrorPageProps = {
  embedded?: boolean;
};

function getErrorContent(error: unknown) {
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return {
        code: "404",
        title: "Halaman tidak ditemukan",
        description:
          "Halaman yang Anda buka tidak tersedia atau mungkin sudah dipindahkan.",
        details: error.statusText,
      };
    }

    if (error.status === 403) {
      return {
        code: "403",
        title: "Akses ditolak",
        description:
          "Anda tidak memiliki izin untuk mengakses halaman ini dengan akun yang sedang digunakan.",
        details: error.statusText,
      };
    }

    return {
      code: String(error.status),
      title: "Halaman tidak bisa dimuat",
      description:
        "Terjadi kendala saat memproses permintaan Anda. Coba muat ulang halaman atau kembali beberapa saat lagi.",
      details: typeof error.data === "string" ? error.data : error.statusText,
    };
  }

  if (error instanceof Error) {
    return {
      code: "Oops",
      title: "Terjadi kesalahan pada aplikasi",
      description:
        "Halaman ini mengalami error tak terduga. Anda bisa mencoba memuat ulang atau kembali ke halaman sebelumnya.",
      details: error.message,
    };
  }

  return {
    code: "Oops",
    title: "Terjadi kesalahan pada aplikasi",
    description:
      "Halaman ini mengalami error tak terduga. Anda bisa mencoba memuat ulang atau kembali ke halaman sebelumnya.",
    details: typeof error === "string" ? error : undefined,
  };
}

export function RouteErrorPage({ embedded = false }: RouteErrorPageProps) {
  const navigate = useNavigate();
  const error = useRouteError();
  const content = getErrorContent(error);

  const card = (
    <MdUpwardCard
      className={cn(
        "w-full rounded-[18px] border border-grey-30 p-6 md:p-8",
        embedded ? "mt-0" : "max-w-[680px]",
      )}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-red-10 text-red-60">
            <AlertTriangle className="size-7" />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold tracking-[0.08em] text-red-60 uppercase">
              {content.code}
            </p>
            <h1 className="mt-1 text-2xl font-medium text-grey-100 md:text-3xl">
              {content.title}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-grey-80 md:text-lg">
              {content.description}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            className="h-11 rounded-xl px-5"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="size-4" />
            Muat Ulang
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-xl border-grey-40 px-5 text-grey-90"
            onClick={() => {
              if (window.history.length > 1) {
                navigate(-1);
                return;
              }

              navigate("/");
            }}
          >
            <ArrowLeft className="size-4" />
            Kembali
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="h-11 rounded-xl px-5 text-grey-90"
            onClick={() => navigate("/")}
          >
            <Home className="size-4" />
            Dashboard
          </Button>
        </div>

        {content.details ? (
          <div className="rounded-xl border border-grey-30 bg-grey-20 px-4 py-3">
            <p className="text-sm font-semibold tracking-[0.08em] text-grey-70 uppercase">
              Detail teknis
            </p>
            <p className="mt-2 text-sm leading-6 break-words text-grey-80">
              {content.details}
            </p>
          </div>
        ) : null}
      </div>
    </MdUpwardCard>
  );

  if (embedded) {
    return <div className="px-8 py-6 md:px-12 md:py-8">{card}</div>;
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-grey-20 px-4 py-8 md:px-8">
      {card}
    </div>
  );
}
