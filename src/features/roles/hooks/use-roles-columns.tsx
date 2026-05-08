import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import type { Role } from "@/types";
import { RoleActions } from "../components/role-actions";
import { RolePermissionsBadge } from "../components/role-permissions-badge";

export function useRolesColumns() {
  const columns: ColumnDef<Role>[] = [
    {
      accessorKey: "name",
      header: "Nama Role",
      cell: ({ row }) => (
        <Badge variant="outline" className="font-bold">
          {row.getValue("name")}
        </Badge>
      ),
    },
    {
      accessorKey: "permissions",
      header: "Permissions",
      cell: ({ row }) => <RolePermissionsBadge permissions={row.original.permissions} />,
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => <RoleActions role={row.original} />,
    },
  ];

  return columns;
}
