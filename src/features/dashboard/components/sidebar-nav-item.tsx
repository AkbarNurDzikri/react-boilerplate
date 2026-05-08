import { NavLink } from "react-router";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { NavItem } from "@/features/dashboard/types";

interface SidebarNavItemProps {
  item: NavItem;
  isActive: boolean;
  collapsed: boolean;
}

export function SidebarNavItem({ item, isActive, collapsed }: SidebarNavItemProps) {
  const Icon = item.icon;

  return (
    <li>
      <Tooltip delayDuration={0} disableHoverableContent={!collapsed}>
        <TooltipTrigger asChild>
          <NavLink
            to={item.href ?? "#"}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              collapsed && "justify-center px-2",
            )}
          >
            <Icon className="size-5 shrink-0" />
            {!collapsed && <span className="truncate">{item.label}</span>}
          </NavLink>
        </TooltipTrigger>
        {collapsed && (
          <TooltipContent side="right">
            {item.label}
            {item.children && (
              <div className="mt-1 border-t pt-1 text-[10px] opacity-70">
                {item.children.map((c) => c.label).join(", ")}
              </div>
            )}
          </TooltipContent>
        )}
      </Tooltip>
    </li>
  );
}
