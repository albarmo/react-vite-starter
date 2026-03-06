import type { AppPermission } from "@/app/config/permissions";

export type UserRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "LIBRARIAN"
  | "CATALOGER"
  | "MEMBERSHIP_OFFICER"
  | "REPORT_VIEWER";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  roles: UserRole[];
  permissions: AppPermission[];
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
};

export type MeResponse = AuthUser;