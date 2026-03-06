export const queryKeys = {
  auth: {
    me: () => ["auth", "me"] as const,
  },

  dashboard: {
    summary: (params?: Record<string, unknown>) =>
      ["dashboard", "summary", params ?? {}] as const,
  },

  membership: {
    list: (params: Record<string, unknown>) =>
      ["membership", "list", params] as const,
    detail: (id: string) => ["membership", "detail", id] as const,
  },

  bibliographic: {
    list: (params: Record<string, unknown>) =>
      ["bibliographic", "list", params] as const,
    detail: (id: string) => ["bibliographic", "detail", id] as const,
  },
};