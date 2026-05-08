import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { Permission } from "@/types";

interface PermissionItemProps {
  permission: Permission;
  isChecked: boolean;
  onToggle: (id: string) => void;
}

export function PermissionItem({ permission, isChecked, onToggle }: PermissionItemProps) {
  return (
    <div className="group flex items-start space-x-2 rounded-md border p-2 transition-colors hover:bg-accent/50">
      <Checkbox
        id={permission.id}
        checked={isChecked}
        onCheckedChange={() => onToggle(permission.id)}
        className="mt-1"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <Label
          htmlFor={permission.id}
          className="cursor-pointer text-xs font-bold capitalize"
        >
          {permission.action}
        </Label>
        {permission.description && (
          <span 
            className="cursor-default text-[10px] text-muted-foreground truncate group-hover:whitespace-normal group-hover:overflow-visible"
            title={permission.description}
          >
            {permission.description}
          </span>
        )}
      </div>
    </div>
  );
}
