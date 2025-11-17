import { createAccessControl } from "better-auth/plugins/access";

// Define your resources and permissions
export const statement = {
  dashboard: ["view"],
  product: ["create", "update", "delete", "view"],
  order: ["create", "update", "delete", "view"],
  customer: ["create", "update", "delete", "view"],
  analytics: ["view"],
  settings: ["update", "view"],
} as const;

// Create access control instance
export const ac = createAccessControl(statement);

// Define user role (restricted access - no dashboard access)
export const user = ac.newRole({
  dashboard: [],
  product: [],
  order: [],
  customer: [],
  analytics: [],
  settings: [],
});

// Define admin role (full access to dashboard)
export const admin = ac.newRole({
  dashboard: ["view"],
  product: ["create", "update", "delete", "view"],
  order: ["create", "update", "delete", "view"],
  customer: ["create", "update", "delete", "view"],
  analytics: ["view"],
  settings: ["update", "view"],
});

// Define manager role (moderate access)
export const manager = ac.newRole({
  dashboard: ["view"],
  product: ["create", "update", "view"],
  order: ["update", "view"],
  customer: ["view"],
  analytics: ["view"],
  settings: ["view"],
});
