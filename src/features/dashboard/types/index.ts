import type { LucideIcon } from "lucide-react";

export interface SubItem {
  label: string;
  href: string;
  permissions?: string[];
}

export interface NavItem {
  label: string;
  href?: string;
  icon: LucideIcon;
  permissions?: string[];
  children?: SubItem[];
}
