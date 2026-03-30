import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

export function StockTakePage() {
  return (
    <Card className="border-grey-30 shadow-sm">
      <CardHeader>
        <CardTitle>Stock Take</CardTitle>
        <CardDescription>
          Stock Take module is ready to be connected to the new Library route
          structure.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-grey-80">
        This page is currently a placeholder so the sidebar and router stay in
        sync while the Stock Take workflow is being completed.
      </CardContent>
    </Card>
  );
}
