import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiClient } from "@/lib/api-client";
import type { Role, ApiError } from "@/types";
import { ROLES_QUERY_KEY } from "../constants";

interface UseRolePermissionFormProps {
  role: Role;
  onSuccess?: () => void;
}

export function useRolePermissionForm({
  role,
  onSuccess,
}: UseRolePermissionFormProps) {
  const queryClient = useQueryClient();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Fetch all available permissions (grouped by resource from server)
  const { data: groupedPermissions, isLoading: isPermsLoading } = useQuery({
    queryKey: ["permissions"],
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/permissions");
      if (error) throw error;
      return data;
    },
  });

  // Initialize selected permissions from the role
  useEffect(() => {
    if (role.permissions) {
      setSelectedIds(role.permissions.map((p) => p.id));
    }
  }, [role]);

  const mutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await apiClient.PUT("/roles/{id}/permissions", {
        params: { path: { id: role.id } },
        body: { permissionIds: selectedIds },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Hak akses berhasil diperbarui");
      void queryClient.invalidateQueries({ queryKey: [...ROLES_QUERY_KEY] });
      onSuccess?.();
    },
    onError: (error: ApiError) => {
      toast.error(error?.message || "Gagal memperbarui hak akses");
    },
  });

  const handleToggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const onSubmit = () => {
    mutation.mutate();
  };

  return {
    groupedPermissions,
    isLoading: isPermsLoading,
    selectedIds,
    handleToggle,
    onSubmit,
    isPending: mutation.isPending,
  };
}
