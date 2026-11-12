export const ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  STAFF: "staff",
  SUPERADMIN: "superadmin"
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
