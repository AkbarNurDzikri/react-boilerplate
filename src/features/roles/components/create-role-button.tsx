import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/store/use-modal-store";
import { RoleForm } from "./role-form";

export function CreateRoleButton() {
  const { openModal, closeModal } = useModalStore();

  const handleOpenModal = () => {
    const id = openModal({
      title: "Tambah Role Baru",
      subTitle: "Buat peran baru untuk mengatur hak akses pengguna",
      content: <RoleForm onSuccess={() => closeModal(id)} />,
      size: "md",
    });
  };

  return (
    <Button size="sm" onClick={handleOpenModal}>
      <Plus className="mr-2 size-4" />
      Tambah Role
    </Button>
  );
}
