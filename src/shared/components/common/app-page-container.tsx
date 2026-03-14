import { cn } from "@/shared/lib/cn";

export function PageContainer({
  className,
  children,
}: React.ComponentProps<"div">) {
  return (
    <main className={cn("px-8 py-6 md:px-16 mx-auto", className)}>
      {children}
    </main>
  );
}
