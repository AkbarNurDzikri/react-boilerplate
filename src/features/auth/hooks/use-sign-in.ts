import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/use-auth-store";
import { apiClient } from "@/lib/api-client";
import type { User, ApiError } from "@/types";
import { signInSchema, type SignInValues } from "../schemas/sign-in.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function useSignIn() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: SignInValues) => {
      const { error: authError } = await apiClient.POST("/auth/login", {
        body: values,
      });
      if (authError) throw authError;

      const { data: profileData, error: profileError } =
        await apiClient.GET("/auth/profile");

      if (profileError || !profileData) {
        throw profileError ?? new Error("Profile data not found");
      }

      return profileData;
    },
    onSuccess: (profileData) => {
      // Pre-populate cache agar useDashboardProfile tidak re-fetch saat dashboard mount
      queryClient.setQueryData(["profile"], profileData);

      const user = {
        ...profileData,
        username:
          typeof profileData.username === "string" ? profileData.username : "",
      } as User;

      setAuth(user);
      toast.success("Berhasil masuk!");
      void navigate("/dashboard");
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      toast.error(apiError?.message || "Username/email atau password salah");
    },
  });

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { identifier: "", password: "" },
  });

  const onSubmit = (values: SignInValues) => mutate(values);

  return { form, onSubmit, isPending };
}
