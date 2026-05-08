import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/dashboard/hooks/use-logout";

interface SidebarLogoutButtonProps {
  collapsed?: boolean;
}

export function SidebarLogoutButton({ collapsed = false }: SidebarLogoutButtonProps) {
  const { handleLogout } = useLogout();

  return (
    <Button
      variant="ghost"
      size={collapsed ? "icon" : "sm"}
      onClick={() => void handleLogout()}
      title="Logout"
      className={
        collapsed
          ? "w-full cursor-pointer justify-center px-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
          : "w-full cursor-pointer justify-start gap-2 px-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
      }
    >
      <LogOut className="size-4 shrink-0" />
      {!collapsed && <span className="truncate text-sm font-medium">Logout</span>}
    </Button>
  );
}
