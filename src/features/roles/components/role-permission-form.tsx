import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/atoms/spinner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogFooter } from "@/components/ui/dialog";
import type { Role } from "@/types";
import { PermissionGroup } from "./permission-group";
import { useRolePermissionForm } from "../hooks/use-role-permission-form";

interface RolePermissionFormProps {
  role: Role;
  onSuccess?: () => void;
}

export function RolePermissionForm({
  role,
  onSuccess,
}: RolePermissionFormProps) {
  const {
    groupedPermissions,
    isLoading,
    selectedIds,
    handleToggle,
    onSubmit,
    isPending,
  } = useRolePermissionForm({ role, onSuccess });

  if (isLoading) {
    return (
      <div className="flex h-75 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <ScrollArea className="h-100 pr-4 pb-4">
        <div className="space-y-6">
          {groupedPermissions &&
            Object.entries(groupedPermissions).map(([resource, perms]) => (
              <PermissionGroup
                key={resource}
                resource={resource}
                permissions={perms}
                selectedIds={selectedIds}
                onToggle={handleToggle}
              />
            ))}
        </div>
      </ScrollArea>

      <DialogFooter className="sticky bottom-0 bg-background border-t pt-4">
        <Button
          onClick={onSubmit}
          disabled={isPending}
          className="w-full sm:w-auto"
        >
          {isPending && <Spinner size="sm" className="mr-2" />}
          Simpan Hak Akses
        </Button>
      </DialogFooter>
    </div>
  );
}
