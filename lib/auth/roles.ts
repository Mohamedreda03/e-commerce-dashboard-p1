import { createAccessControl } from "better-auth/plugins/access";

// Shared permission matrix for management roles; update once and reuse on server/client.
export const accessControl = createAccessControl({
  catalog: ["read", "create", "update", "delete"],
  orders: ["read", "update", "refund"],
  customers: ["read", "update"],
  settings: ["read", "update"],
} as const);

export const managerRole = accessControl.newRole({
  catalog: ["read", "update"],
  orders: ["read", "update"],
  customers: ["read", "update"],
  settings: ["read"],
});

export const adminRole = accessControl.newRole({
  catalog: ["create", "update", "delete"],
  orders: ["read", "update", "refund"],
  customers: ["read", "update"],
  settings: ["read", "update"],
});

export type RoleName = "manager" | "admin";
