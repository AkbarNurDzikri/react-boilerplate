import { Separator } from "@/components/ui/separator";
import type { Permission } from "@/types";
import { PermissionItem } from "./permission-item";

interface PermissionGroupProps {
  resource: string;
  permissions: Permission[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export function PermissionGroup({
  resource,
  permissions,
  selectedIds,
  onToggle,
}: PermissionGroupProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          {resource}
        </h3>
        <Separator className="flex-1" />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {permissions.map((permission) => (
          <PermissionItem
            key={permission.id}
            permission={permission}
            isChecked={selectedIds.includes(permission.id)}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
}
