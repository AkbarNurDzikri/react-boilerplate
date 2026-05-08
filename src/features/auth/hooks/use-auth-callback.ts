import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/use-auth-store";
import { apiClient } from "@/lib/api-client";
import type { User } from "@/types";

export function useAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const queryClient = useQueryClient();
  const processed = useRef(false);

  useEffect(() => {
    if (processed.current) return;
    processed.current = true;

    const errorMessage = searchParams.get("message");

    if (errorMessage) {
      sessionStorage.setItem("auth_error", errorMessage);
      void navigate("/sign-in", { replace: true });
      return;
    }

    apiClient
      .GET("/auth/profile")
      .then(({ data, error }) => {
        if (error || !data) throw error ?? new Error("Profile data not found");

        // Pre-populate cache agar useDashboardProfile tidak re-fetch saat dashboard mount
        queryClient.setQueryData(["profile"], data);

        const user = {
          ...data,
          username: typeof data.username === "string" ? data.username : "",
        } as User;
        setAuth(user);
        toast.success("Berhasil masuk dengan Google!");
        void navigate("/dashboard", { replace: true });
      })
      .catch(() => {
        toast.error("Login gagal. Silakan coba lagi.");
        void navigate("/sign-in", { replace: true });
      });
  }, [searchParams, navigate, setAuth, queryClient]);
}
