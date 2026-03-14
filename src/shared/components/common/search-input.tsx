import { Search, X } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type SearchInputProps = Omit<React.ComponentProps<typeof Input>, "suffix"> & {
  allowClear?: boolean;
  onClear?: () => void;
};

export function SearchInput({
  className,
  allowClear = false,
  onClear,
  value,
  ...props
}: SearchInputProps) {
  const hasValue =
    typeof value === "string" ? value.length > 0 : typeof value === "number";

  return (
    <div className="relative flex items-center">
      <Search className="pointer-events-none absolute left-3.5 size-4 text-grey-80" />

      <Input
        value={value}
        className={cn(
          "h-11 rounded-md border-grey-50 px-10 text-sm text-grey-100 shadow-none placeholder:text-grey-70",
          allowClear && hasValue && "pr-10",
          className,
        )}
        {...props}
      />

      {allowClear && hasValue ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          className="absolute right-2 rounded-full text-grey-80 hover:bg-blue-10 hover:text-grey-100"
          onClick={onClear}
        >
          <X className="size-3.5" />
        </Button>
      ) : null}
    </div>
  );
}
