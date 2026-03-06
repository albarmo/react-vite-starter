export type DashboardCardItem = {
  title: string;
  value: string | number;
  description?: string;
};

export type DashboardSummaryResponse = {
  totalCollections: number;
  totalItems: number;
  totalMembers: number;
  activeLoans: number;
};