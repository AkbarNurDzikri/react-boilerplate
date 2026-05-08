import type { ReactNode } from "react";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { QueryKey } from "@tanstack/react-query";
import type { PermissionKey } from "@/types";
import { DeleteButton } from "./delete-button";
import { PermissionGuard } from "./permission-guard";

export interface DropdownItem {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  variant?: "default" | "destructive";
  disabled?: boolean;
  separator?: boolean;
  content?: ReactNode;
  // Delete logic
  mutationFn?: () => Promise<any>;
  queryKey?: QueryKey;
  targetDeletion?: string;
  // Permission guard
  permission?: PermissionKey;
  permissions?: PermissionKey[];
  requireAll?: boolean;
}

export interface DropdownProps {
  items: DropdownItem[];
  trigger?: ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
}

export function Dropdown({
  items,
  trigger,
  className,
  align = "end",
}: DropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger ?? (
          <Button
            variant="ghost"
            size="icon"
            className={cn("size-8 ", className)}
          >
            <MoreHorizontal className="size-4" />
            <span className="sr-only">Buka menu</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        {items.map((item, index) => (
          <PermissionGuard
            key={index}
            permission={item.permission}
            permissions={item.permissions}
            requireAll={item.requireAll}
          >
            <div>
              {item.separator && <DropdownMenuSeparator />}
              {item.content ? (
                item.content
              ) : item.mutationFn ? (
                <DropdownMenuItem
                  asChild
                  className={cn(
                    "flex items-center gap-2 hover:cursor-pointer text-destructive focus:text-destructive",
                  )}
                >
                  <DeleteButton
                    mutationFn={item.mutationFn}
                    targetDeletion={item?.targetDeletion}
                    queryKey={item.queryKey}
                    className="w-full justify-start px-2 py-1.5 h-auto font-normal"
                  >
                    {item.icon}
                    {item.label}
                  </DeleteButton>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={item.onClick}
                  disabled={item.disabled}
                  className={cn(
                    "flex items-center gap-2 hover:cursor-pointer",
                    item.variant === "destructive" &&
                      "text-destructive focus:text-destructive",
                  )}
                >
                  {item.icon}
                  {item.label}
                </DropdownMenuItem>
              )}
            </div>
          </PermissionGuard>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
