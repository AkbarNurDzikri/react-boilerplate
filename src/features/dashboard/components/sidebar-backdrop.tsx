import { cn } from "@/lib/utils";
import { useMobileSidebarStore } from "@/store/use-mobile-sidebar-store";

export function SidebarBackdrop() {
  const { isOpen, close } = useMobileSidebarStore();

  return (
    <div
      onClick={close}
      aria-hidden="true"
      className={cn(
        "fixed inset-0 z-40 md:hidden",
        "transition-all duration-300",
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
      )}
    >
      {/* Dark blur overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      {/* Glow orbs */}
      <div className="absolute left-1/3 top-1/4 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute right-1/4 bottom-1/3 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="absolute left-1/2 bottom-1/4 h-40 w-40 rounded-full bg-blue-400/10 blur-2xl" />
    </div>
  );
}
