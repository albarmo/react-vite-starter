import { Button } from "@/shared/components/ui/button";
import type { ApiPaginationMeta } from "@/shared/types/api.type";

type DataTablePaginationProps = {
  meta: ApiPaginationMeta;
  onPrevious: () => void;
  onNext: () => void;
};

export function DataTablePagination({
  meta,
  onPrevious,
  onNext,
}: DataTablePaginationProps) {
  return (
    <div className="mt-4 flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Halaman {meta.page} dari {meta.totalPages} · Total {meta.total} data
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={meta.page <= 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={onNext}
          disabled={meta.page >= meta.totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}