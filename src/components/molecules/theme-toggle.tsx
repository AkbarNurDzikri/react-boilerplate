import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/store/use-theme-store";

interface ThemeToggleProps {
  collapsed?: boolean;
}

export function ThemeToggle({ collapsed = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size={collapsed ? "icon" : "sm"}
      onClick={toggleTheme}
      title={isDark ? "Ganti ke Light Mode" : "Ganti ke Dark Mode"}
      className="w-full justify-start gap-2 px-2"
    >
      {isDark ? (
        <Sun className="size-4 shrink-0" />
      ) : (
        <Moon className="size-4 shrink-0" />
      )}
      {!collapsed && (
        <span className="truncate text-sm">{isDark ? "Light" : "Dark"}</span>
      )}
    </Button>
  );
}
