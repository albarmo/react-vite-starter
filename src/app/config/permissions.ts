export const PERMISSIONS = {
  DASHBOARD_VIEW: "dashboard.view",

  BIBLIOGRAPHIC_READ: "bibliographic.read",
  BIBLIOGRAPHIC_CREATE: "bibliographic.create",
  BIBLIOGRAPHIC_UPDATE: "bibliographic.update",
  BIBLIOGRAPHIC_DELETE: "bibliographic.delete",

  MEMBERSHIP_READ: "membership.read",
  MEMBERSHIP_CREATE: "membership.create",
  MEMBERSHIP_UPDATE: "membership.update",
  MEMBERSHIP_DELETE: "membership.delete",

  CIRCULATION_READ: "circulation.read",
  CIRCULATION_CREATE: "circulation.create",

  REPORTING_READ: "reporting.read",
  REPORTING_EXPORT: "reporting.export",

  MASTER_FILE_READ: "masterfile.read",
  MASTER_FILE_UPDATE: "masterfile.update",

  STOCK_TAKE_READ: "stocktake.read",
  STOCK_TAKE_APPROVE: "stocktake.approve",
} as const;

export type AppPermission =
(typeof PERMISSIONS)[keyof typeof PERMISSIONS];