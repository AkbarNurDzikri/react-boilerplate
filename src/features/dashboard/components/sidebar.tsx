import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/molecules/theme-toggle";
import { SidebarNavList } from "./sidebar-nav-list";
import { SidebarUserCard } from "./sidebar-user-card";
import { SidebarLogoutButton } from "./sidebar-logout-button";
import { useSidebar } from "@/features/dashboard/hooks/use-sidebar";
import { useMobileSidebarStore } from "@/store/use-mobile-sidebar-store";
import type { User } from "@/types";

interface SidebarProps {
  user?: User | null;
}

export function Sidebar({ user }: SidebarProps) {
  const { collapsed, toggleCollapsed, isMenuOpen, toggleMenu, isItemActive, visibleItems } =
    useSidebar(user);
  const { isOpen: isMobileOpen, close: closeMobile } = useMobileSidebarStore();

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside
        className={cn(
          "relative hidden flex-col border-r bg-sidebar transition-all duration-300 md:flex",
          collapsed ? "w-16" : "w-64",
        )}
      >
        <div className="flex h-16 items-center border-b px-4">
          {!collapsed && (
            <span className="truncate text-lg font-bold text-sidebar-foreground">
              {import.meta.env.VITE_APP_NAME}
            </span>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <SidebarNavList
            visibleItems={visibleItems}
            collapsed={collapsed}
            isItemActive={isItemActive}
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
          />
        </nav>

        <div className="space-y-3 border-t px-3 py-4">
          <SidebarUserCard user={user} collapsed={collapsed} />
          {collapsed ? (
            <div className="space-y-1">
              <ThemeToggle collapsed={collapsed} />
              <SidebarLogoutButton collapsed={collapsed} />
            </div>
          ) : (
            <div className="flex gap-1">
              <div className="flex-1">
                <ThemeToggle collapsed={collapsed} />
              </div>
              <div className="flex-1">
                <SidebarLogoutButton collapsed={collapsed} />
              </div>
            </div>
          )}
        </div>

        <button
          onClick={toggleCollapsed}
          className="absolute -right-3 top-20 flex size-6 cursor-pointer items-center justify-center rounded-full border bg-background text-muted-foreground shadow-sm hover:bg-accent"
        >
          {collapsed ? (
            <ChevronRight className="size-3.5" />
          ) : (
            <ChevronLeft className="size-3.5" />
          )}
        </button>
      </aside>

      {/* ── Mobile drawer ── */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar md:hidden",
          "border-r shadow-[0_0_80px_rgba(0,0,0,0.5),0_0_40px_rgba(0,0,0,0.3)]",
          "transition-transform duration-300 ease-in-out",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Close button — slides into drawer top-right as drawer opens */}
        <Button
          variant="ghost"
          size="icon"
          onClick={closeMobile}
          aria-label="Tutup menu"
          className={cn(
            "absolute right-3 top-3.5 z-10 size-9 cursor-pointer rounded-xl",
            "border border-sidebar-foreground/10 bg-sidebar-accent/40 text-sidebar-foreground",
            "transition-all duration-300 ease-in-out",
            isMobileOpen
              ? "translate-x-0 opacity-100 scale-100"
              : "translate-x-4 opacity-0 scale-75 pointer-events-none",
          )}
        >
          <X className="size-4" />
        </Button>

        <div className="flex h-16 items-center border-b px-4 pr-14">
          <span className="truncate text-lg font-bold text-sidebar-foreground">
            {import.meta.env.VITE_APP_NAME}
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <SidebarNavList
            visibleItems={visibleItems}
            collapsed={false}
            isItemActive={isItemActive}
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
          />
        </nav>

        <div className="space-y-3 border-t px-3 py-4">
          <SidebarUserCard user={user} collapsed={false} />
          <div className="flex gap-1">
            <div className="flex-1">
              <ThemeToggle collapsed={false} />
            </div>
            <div className="flex-1">
              <SidebarLogoutButton collapsed={false} />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
