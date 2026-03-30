import type { DashboardCardItem } from "../types/dashboard.type";
import { DashboardCard } from "./dashboard-card";

type DashboardCardsSectionProps = {
  items: DashboardCardItem[];
};

export function DashboardCardsSection({
  items,
}: DashboardCardsSectionProps) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <DashboardCard
          key={item.title}
          title={item.title}
          value={item.value}
          description={item.description}
        />
      ))}
    </section>
  );
}