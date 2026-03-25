import { cn } from "@/shared/lib/cn";

export function PageContainer({
  className,
  children,
}: React.ComponentProps<"div">) {
  return (
    <main className={cn("mx-auto px-8 md:px-12", className)}>{children}</main>
  );
}
