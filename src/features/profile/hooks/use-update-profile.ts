import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/use-auth-store";
import { apiClient } from "@/lib/api-client";
import { updateProfileSchema, type UpdateProfileValues } from "../schemas/profile.schema";
import type { ApiError, User } from "@/types";
import { useEffect } from "react";

export function useUpdateProfile(user: User | null | undefined) {
  const queryClient = useQueryClient();

  const form = useForm<UpdateProfileValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { 
      username: typeof user?.username === "string" ? user.username : "" 
    },
  });

  useEffect(() => {
    const currentUsername =
      typeof user?.username === "string" ? user.username : "";

    if (
      currentUsername &&
      !form.formState.isDirty &&
      form.getValues("username") !== currentUsername
    ) {
      form.reset({ username: currentUsername });
    }
  }, [user?.username, form]);

  const { updateUser } = useAuthStore();
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: UpdateProfileValues) => {
      const { data, error } = await apiClient.PATCH("/auth/profile", {
        body: values,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      if (data) {
        // Sanitize data before updating store
        const sanitizedUser = {
          ...data,
          username: typeof data.username === "string" ? data.username : "",
        } as User;
        updateUser(sanitizedUser);
      }
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profil berhasil diperbarui");
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      toast.error(apiError?.message || "Gagal memperbarui profil");
    },
  });

  const onSubmit = (values: UpdateProfileValues) => mutate(values);

  return { form, onSubmit, isPending };
}
