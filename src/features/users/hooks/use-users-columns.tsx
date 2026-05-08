import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import type { User } from "@/types";
import { UserActions } from "../components/user-actions";

export function useUsersColumns() {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "username",
      header: "Username",
      cell: ({ row }) => (
        <span className="font-medium">
          {row.getValue<string | null>("username") ?? "-"}
        </span>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.original.role?.name ?? "USER";
        return (
          <Badge
            variant={role === "ADMIN" ? "default" : "secondary"}
            className="capitalize"
          >
            {role.toLowerCase()}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Dibuat",
      cell: ({ row }) => {
        const date = new Date(row.getValue<string>("createdAt"));
        return (
          <span className="text-muted-foreground text-sm">
            {format(date, "dd MMM yyyy", { locale: id })}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => <UserActions user={row.original} />,
    },
  ];

  return columns;
}
