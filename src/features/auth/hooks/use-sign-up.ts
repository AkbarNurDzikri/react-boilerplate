import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { apiClient } from "@/lib/api-client";
import type { ApiError } from "@/types";
import { signUpSchema, type SignUpValues } from "../schemas/sign-up.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function useSignUp() {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: SignUpValues) => {
      const { confirmPassword: _confirmPassword, ...body } = values;
      const { data, error } = await apiClient.POST("/auth/register", {
        body,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      toast.success(
        data.message ||
          "Akun berhasil dibuat! Silakan cek email Anda untuk verifikasi.",
      );
      void navigate("/sign-in");
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      const message =
        apiError?.message || "Gagal membuat akun. Silakan coba lagi.";
      toast.error(message);
    },
  });

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: SignUpValues) => mutate(values);

  return {
    isPending,
    form,
    onSubmit,
  };
}
