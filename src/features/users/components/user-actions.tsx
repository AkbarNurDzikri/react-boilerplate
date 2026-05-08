import { UserCog } from "lucide-react";
import { useModalStore } from "@/store/use-modal-store";
import type { User } from "@/types";
import { UserRoleForm } from "./user-role-form";
import { Button } from "@/components/ui/button";
import { UserStatusSwitch } from "./user-status-switch";

interface UserActionsProps {
  user: User;
}

export function UserActions({ user }: UserActionsProps) {
  const { openModal, closeModal } = useModalStore();

  const handleAssignRole = () => {
    const id = openModal({
      title: "Atur Role Pengguna",
      subTitle: `Pilih peran sistem untuk ${user.username || user.email}`,
      content: <UserRoleForm user={user} onSuccess={() => closeModal(id)} />,
      size: "md",
    });
  };

  return (
    <>
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={handleAssignRole}
        title="Atur Role"
      >
        <UserCog className="size-4" />
      </Button>

      <UserStatusSwitch user={user} />
    </>
  );
}
