import { LayoutDashboard, Database, Activity } from "lucide-react";
import type { NavItem } from "@/features/dashboard/types";

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    label: "Master Data",
    icon: Database,
    permissions: ["user:read", "role:read"],
    children: [
      { label: "User", href: "/users", permissions: ["user:read"] },
      { label: "Role", href: "/roles", permissions: ["role:read"] },
    ],
  },
  {
    label: "Aktivitas",
    icon: Activity,
    permissions: ["auditLog:read"],
    children: [
      {
        label: "Audit Log",
        href: "/audit-logs",
        permissions: ["auditLog:read"],
      },
    ],
  },
];
