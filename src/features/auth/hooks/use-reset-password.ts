import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { apiClient } from "@/lib/api-client";
import type { ApiError } from "@/types";
import { resetPasswordSchema, type ResetPasswordValues } from "../schemas/reset-password.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function useResetPassword(token: string) {
  const navigate = useNavigate();

  const {mutate, isPending} =  useMutation({
    mutationFn: async (values: ResetPasswordValues) => {
      const { data, error } = await apiClient.POST("/auth/reset-password", {
        body: {
          token,
          newPassword: values.newPassword,
        },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Password berhasil direset. Silakan masuk.");
      void navigate("/sign-in");
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      const message =
        apiError?.message ||
        "Gagal mereset password. Token mungkin sudah kadaluarsa.";
      toast.error(message);
    },
  });

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: "", confirmNewPassword: "" },
  });

  const onSubmit = (values: ResetPasswordValues) => mutate(values);

  return {
    form,
    onSubmit,
    isPending,
  }
}
