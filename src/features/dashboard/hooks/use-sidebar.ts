import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import { navItems } from "@/features/dashboard/constants/nav-items";
import type { NavItem } from "@/features/dashboard/types";
import type { User } from "@/types";

export function useSidebar(propUser?: User | null) {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const { user: storeUser } = useAuth();
  const location = useLocation();

  const user = propUser ?? storeUser;
  const userPermissions = user?.role?.permissions ?? [];
  const isAdmin = user?.role?.name === "ADMIN";

  const checkPermission = (requiredPermissions?: string[]) => {
    if (!requiredPermissions || isAdmin) return true;
    return requiredPermissions.some((p) => {
      const [resource, action] = p.split(":");
      return userPermissions.some(
        (perm) => perm.resource === resource && perm.action === action,
      );
    });
  };

  useEffect(() => {
    const activeParentMenus = navItems
      .filter((item) =>
        item.children?.some((child) => location.pathname.startsWith(child.href)),
      )
      .map((item) => item.label);

    setOpenMenus((prev) => {
      if (
        prev.length === activeParentMenus.length &&
        prev.every((val) => activeParentMenus.includes(val))
      ) {
        return prev;
      }
      return activeParentMenus;
    });
  }, [location.pathname]);

  const toggleCollapsed = () => setCollapsed((prev) => !prev);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((m) => m !== label) : [...prev, label],
    );
  };

  const isMenuOpen = (label: string) => openMenus.includes(label);

  const isItemActive = (item: NavItem): boolean => {
    if (item.href) {
      return (
        location.pathname === item.href ||
        (item.href !== "/dashboard" && location.pathname.startsWith(item.href))
      );
    }
    return (
      item.children?.some((child) => location.pathname.startsWith(child.href)) ?? false
    );
  };

  const visibleItems = navItems
    .filter((item) => checkPermission(item.permissions))
    .map((item) => ({
      ...item,
      children: item.children?.filter((child) => checkPermission(child.permissions)),
    }))
    .filter((item) => !item.children || item.children.length > 0);

  return {
    collapsed,
    toggleCollapsed,
    isMenuOpen,
    toggleMenu,
    isItemActive,
    visibleItems,
  };
}
