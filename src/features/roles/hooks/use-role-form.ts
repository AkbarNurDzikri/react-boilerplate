import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiClient } from "@/lib/api-client";
import type { ApiError, Role } from "@/types";
import { roleSchema, type RoleFormValues } from "../schemas/role-schema";
import { ROLES_QUERY_KEY } from "../constants";

interface UseRoleFormProps {
  onSuccess?: () => void;
  initialData?: Role;
}

export function useRoleForm({ onSuccess, initialData }: UseRoleFormProps) {
  const queryClient = useQueryClient();
  const isEdit = !!initialData;

  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: RoleFormValues) => {
      if (isEdit) {
        const { data, error } = await apiClient.PATCH("/roles/{id}", {
          params: { path: { id: initialData.id } },
          body: values,
        });
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await apiClient.POST("/roles", {
          body: values,
        });
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      toast.success(`Role berhasil ${isEdit ? "diperbarui" : "dibuat"}`);
      void queryClient.invalidateQueries({ queryKey: [...ROLES_QUERY_KEY] });
      onSuccess?.();
    },
    onError: (error: ApiError) => {
      toast.error(error?.message || `Gagal ${isEdit ? "memperbarui" : "membuat"} role`);
    },
  });

  const onSubmit = (values: RoleFormValues) => {
    mutation.mutate(values);
  };

  return {
    form,
    onSubmit,
    isPending: mutation.isPending,
    isEdit,
  };
}
