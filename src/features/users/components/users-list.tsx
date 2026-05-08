import { DataTable } from "@/components/molecules/data-table";
import { useUsersColumns } from "../hooks/use-users-columns";
import { USERS_QUERY_KEY } from "../constants";

export function UsersList() {
  const columns = useUsersColumns();

  return (
    <DataTable
      title="Manajemen User"
      description="Kelola pengguna dan hak akses mereka"
      columns={columns}
      apiEndpoint="/users"
      queryKey={[...USERS_QUERY_KEY]}
      searchPlaceholder="Cari pengguna..."
    />
  );
}
