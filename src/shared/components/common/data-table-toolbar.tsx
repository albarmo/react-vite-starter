import { Input } from "@/shared/components/ui/input";

type DataTableToolbarProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  action?: React.ReactNode;
};

export function DataTableToolbar({
  searchValue,
  onSearchChange,
  placeholder = "Cari data...",
  action,
}: DataTableToolbarProps) {
  return (
    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <Input
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="w-full md:max-w-sm"
      />
      {action ? <div>{action}</div> : null}
    </div>
  );
}