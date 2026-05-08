import { Outlet } from "react-router";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/features/dashboard/components/sidebar";
import { Header } from "@/features/dashboard/components/header";
import { SidebarMobileTrigger } from "@/features/dashboard/components/sidebar-mobile-trigger";
import { SidebarBackdrop } from "@/features/dashboard/components/sidebar-backdrop";
import { useDashboardProfile } from "@/features/dashboard/hooks/use-dashboard-profile";

export function DashboardLayout() {
  const { user } = useDashboardProfile();

  return (
    <TooltipProvider>
      <div className="flex h-svh overflow-hidden">
        <Sidebar user={user} />

        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto px-6 py-2">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Mobile-only: hamburger trigger + backdrop with blur+glow */}
      <SidebarMobileTrigger />
      <SidebarBackdrop />
    </TooltipProvider>
  );
}
