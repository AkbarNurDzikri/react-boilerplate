import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMobileSidebarStore } from "@/store/use-mobile-sidebar-store";
import { cn } from "@/lib/utils";

export function SidebarMobileTrigger() {
  const { isOpen, toggle } = useMobileSidebarStore();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label="Buka menu navigasi"
      className={cn(
        "fixed top-4 right-4 z-50 md:hidden",
        "size-10 rounded-xl border bg-background/90 shadow-lg backdrop-blur-sm",
        "transition-all duration-300",
        isOpen && "opacity-0 pointer-events-none -translate-y-1 scale-90",
      )}
    >
      <Menu className="size-5" />
    </Button>
  );
}
