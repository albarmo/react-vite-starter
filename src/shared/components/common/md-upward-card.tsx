import { cn } from "@/shared/lib/cn";

export function MdUpwardCard({
  className,
  children,
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "p-2.5 md:p-5 md:border border-grey-30 rounded-[10px] bg-white",
        className,
      )}
    >
      {children}
    </div>
  );
}
