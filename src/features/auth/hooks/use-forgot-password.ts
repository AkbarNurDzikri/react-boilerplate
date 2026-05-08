import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiClient } from "@/lib/api-client";
import type { ApiError } from "@/types";
import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from "../schemas/forgot-password.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function useForgotPassword() {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (values: ForgotPasswordValues) => {
      const { data, error } = await apiClient.POST("/auth/forgot-password", {
        body: values,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Link reset password telah dikirim ke email Anda");
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      const message =
        apiError?.message || "Gagal mengirim email. Silakan coba lagi.";
      toast.error(message);
    },
  });

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (values: ForgotPasswordValues) => mutate(values);

  return {
    form,
    onSubmit,
    isPending,
    isSuccess,
  };
}
