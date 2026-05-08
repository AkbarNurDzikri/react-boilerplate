import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiClient } from "@/lib/api-client";
import { USERS_QUERY_KEY } from "../constants";

export function useUserStatus() {
  const queryClient = useQueryClient();

  const toggleStatusMutation = useMutation({
    mutationFn: async ({ userId, isActive }: { userId: string; isActive: boolean }) => {
      const { error } = await apiClient.PATCH("/users/{id}/status", {
        params: { path: { id: userId } },
        body: { isActive },
      });
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      toast.success("Status pengguna berhasil diubah");
      void queryClient.invalidateQueries({ queryKey: [...USERS_QUERY_KEY] });
    },
    onError: () => {
      toast.error("Gagal mengubah status pengguna");
    },
  });

  return {
    toggleStatus: toggleStatusMutation.mutate,
    isPending: toggleStatusMutation.isPending,
    variables: toggleStatusMutation.variables,
  };
}
