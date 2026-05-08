import { SidebarNavItem } from "./sidebar-nav-item";
import { SidebarNavGroup } from "./sidebar-nav-group";
import type { NavItem } from "@/features/dashboard/types";

interface SidebarNavListProps {
  visibleItems: NavItem[];
  collapsed: boolean;
  isItemActive: (item: NavItem) => boolean;
  isMenuOpen: (label: string) => boolean;
  toggleMenu: (label: string) => void;
}

export function SidebarNavList({
  visibleItems,
  collapsed,
  isItemActive,
  isMenuOpen,
  toggleMenu,
}: SidebarNavListProps) {
  return (
    <ul className="space-y-1 px-2">
      {visibleItems.map((item) => {
        const isActive = isItemActive(item);

        if (item.children && item.children.length > 0 && !collapsed) {
          return (
            <SidebarNavGroup
              key={item.label}
              label={item.label}
              icon={item.icon}
              subItems={item.children}
              isActive={isActive}
              isOpen={isMenuOpen(item.label)}
              onToggle={() => toggleMenu(item.label)}
            />
          );
        }

        return (
          <SidebarNavItem
            key={item.label}
            item={item}
            isActive={isActive}
            collapsed={collapsed}
          />
        );
      })}
    </ul>
  );
}
