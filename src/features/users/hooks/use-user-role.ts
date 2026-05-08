import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiClient } from "@/lib/api-client";
import type { User } from "@/types";
import { USERS_QUERY_KEY } from "../constants";

const formSchema = z.object({
  roleId: z.string().min(1, "Pilih role terlebih dahulu"),
});

export type UserRoleFormValues = z.infer<typeof formSchema>;

interface UseUserRoleProps {
  user: User;
  onSuccess: () => void;
}

export function useUserRole({ user, onSuccess }: UseUserRoleProps) {
  const queryClient = useQueryClient();

  const form = useForm<UserRoleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roleId: user.role?.id ?? "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: UserRoleFormValues) => {
      const { error } = await apiClient.PUT("/users/{id}/role", {
        params: { path: { id: user.id } },
        body: { roleId: values.roleId },
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success(
        `Role untuk ${user.username || user.email} berhasil diperbarui`,
      );
      void queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
      onSuccess();
    },
    onError: (error: Error) => {
      toast.error(error?.message || "Gagal memperbarui role");
    },
  });

  const onSubmit = (values: UserRoleFormValues) => {
    mutation.mutate(values);
  };

  const searchRoles = async (query: string) => {
    const { data, error } = await apiClient.GET("/roles/list", {
      params: { query: { search: query } },
    });
    if (error) throw error;

    const roles = data ?? [];
    
    return roles.map((role) => ({
      label: role.name,
      value: role.id,
    }));
  };

  return {
    form,
    isPending: mutation.isPending,
    onSubmit,
    searchRoles,
  };
}
