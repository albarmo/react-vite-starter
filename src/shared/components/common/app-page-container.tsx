import { cn } from "@/shared/lib/cn";

export function PageContainer({
  className,
  children,
}: React.ComponentProps<"div">) {
  return (
    <main className={cn("px-8 md:px-12 mx-auto", className)}>
      {children}
    </main>
  );
}
