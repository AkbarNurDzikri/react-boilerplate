import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/use-auth-store";
import { apiClient } from "@/lib/api-client";
import { changePasswordSchema, type ChangePasswordValues } from "../schemas/profile.schema";
import type { ApiError } from "@/types";

export function useChangePassword() {
  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { oldPassword: "", newPassword: "", confirmNewPassword: "" },
  });

  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: ChangePasswordValues) => {
      const { data, error } = await apiClient.POST("/auth/change-password", {
        body: {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Password berhasil diubah. Silakan login kembali.");
      logout();
      void navigate("/sign-in", { replace: true });
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      toast.error(apiError?.message || "Gagal mengubah password");
    },
  });

  const onSubmit = (values: ChangePasswordValues) => mutate(values);

  return { form, onSubmit, isPending };
}
