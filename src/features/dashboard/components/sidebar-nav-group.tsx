import { NavLink } from "react-router";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { SubItem } from "@/features/dashboard/types";

interface SidebarNavGroupProps {
  label: string;
  icon: LucideIcon;
  subItems: SubItem[];
  isActive: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

export function SidebarNavGroup({
  label,
  icon: Icon,
  subItems,
  isActive,
  isOpen,
  onToggle,
}: SidebarNavGroupProps) {
  return (
    <li className="space-y-1">
      <button
        onClick={onToggle}
        className={cn(
          "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        )}
      >
        <div className="flex items-center gap-3">
          <Icon className="size-5 shrink-0" />
          <span>{label}</span>
        </div>
        <ChevronDown
          className={cn(
            "size-4 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>
      {isOpen && (
        <ul className="ml-5.5 mt-1 space-y-1 border-l border-sidebar-foreground/20 pb-1 pl-4">
          {subItems.map((child) => (
            <li key={child.href} className="relative">
              <span className="absolute -left-4 top-1/2 h-px w-3 bg-sidebar-foreground/20" />
              <NavLink
                to={child.href}
                className={({ isActive }) =>
                  cn(
                    "block rounded-md px-3 py-1.5 text-sm transition-colors",
                    isActive
                      ? "bg-sidebar-primary/80 text-sidebar-primary-foreground font-medium shadow-sm"
                      : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
                  )
                }
              >
                {child.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
