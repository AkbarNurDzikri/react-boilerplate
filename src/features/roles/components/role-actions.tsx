import { Edit, Shield, Trash2 } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { useModalStore } from "@/store/use-modal-store";
import type { Role } from "@/types";
import { RoleForm } from "./role-form";
import { RolePermissionForm } from "./role-permission-form";
import { ROLES_QUERY_KEY } from "../constants";
import { Dropdown, type DropdownItem } from "@/components/molecules/dropdown";

interface RoleActionsProps {
  role: Role;
}

export function RoleActions({ role }: RoleActionsProps) {
  const { openModal, closeModal } = useModalStore();

  const handleEdit = () => {
    const id = openModal({
      title: "Edit Role",
      subTitle: `Perbarui informasi untuk role ${role.name}`,
      content: <RoleForm initialData={role} onSuccess={() => closeModal(id)} />,
      size: "md",
    });
  };

  const handleManagePermissions = () => {
    const id = openModal({
      title: "Kelola Hak Akses",
      subTitle: `Atur hak akses untuk role ${role.name}`,
      content: (
        <RolePermissionForm role={role} onSuccess={() => closeModal(id)} />
      ),
      size: "lg",
    });
  };

  const items: DropdownItem[] = [
    {
      label: "Edit",
      icon: <Edit className="h-4 w-4" />,
      onClick: handleEdit,
      permission: "role:write",
    },
    {
      label: "Hak Akses",
      icon: <Shield className="h-4 w-4" />,
      onClick: handleManagePermissions,
      permission: "role:write",
    },
    {
      label: "Hapus",
      icon: <Trash2 className="h-4 w-4" />,
      separator: true,
      mutationFn: async () => {
        const { error } = await apiClient.DELETE("/roles/{id}", {
          params: { path: { id: role.id } },
        });
        if (error) throw error;
      },
      queryKey: ROLES_QUERY_KEY,
      targetDeletion: role.name,
      permission: "role:delete",
    },
  ];

  return <Dropdown items={items} />;
}
