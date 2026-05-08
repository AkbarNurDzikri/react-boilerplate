import { DataTable } from "@/components/molecules/data-table";
import { useRolesColumns } from "../hooks/use-roles-columns";
import { ROLES_QUERY_KEY } from "../constants";
import { CreateRoleButton } from "./create-role-button";
import { useAuth } from "@/hooks/use-auth";

export function RolesList() {
  const columns = useRolesColumns();
  const hasPermission = useAuth().hasPermission("role:write");

  return (
    <DataTable
      title="Manajemen Role"
      description="Kelola peran dan hak akses sistem"
      columns={columns}
      apiEndpoint="/roles"
      queryKey={[...ROLES_QUERY_KEY]}
      createButton={hasPermission && <CreateRoleButton />}
      searchPlaceholder="Cari role..."
    />
  );
}
