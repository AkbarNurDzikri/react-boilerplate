import { useUserStatus } from "../hooks/use-user-status";
import type { User } from "@/types";
import { Button } from "@/components/ui/button";
import { Power, PowerOff } from "lucide-react";

interface UserStatusSwitchProps {
  user: User;
}

export function UserStatusSwitch({ user }: UserStatusSwitchProps) {
  const { toggleStatus, isPending, variables } = useUserStatus();
  const isUpdating = isPending && variables?.userId === user.id;

  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      onClick={() =>
        toggleStatus({ userId: user.id, isActive: !user.isActive })
      }
      disabled={isUpdating}
      title={user.isActive ? "Nonaktifkan" : "Aktifkan"}
    >
      {user.isActive ? (
        <Power className="text-green-500" />
      ) : (
        <PowerOff className="text-red-500" />
      )}
    </Button>
  );
}
