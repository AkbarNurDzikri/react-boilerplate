import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { apiClient } from "@/lib/api-client";
import type { User } from "@/types";

export function useDashboardProfile() {
  const { isAuthenticated, user: storeUser, setAuth } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/auth/profile");
      if (error) throw error;
      return data;
    },
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (profile && isAuthenticated && storeUser) {
      const updatedUser: User = {
        ...storeUser,
        id: profile.id,
        email: profile.email,
        username:
          typeof profile.username === "string"
            ? profile.username
            : (storeUser?.username ?? undefined),
        isActive: profile.isActive ?? storeUser.isActive,
        isEmailVerified: profile.isEmailVerified ?? storeUser.isEmailVerified,
        role: profile.role ?? null,
      };
      if (JSON.stringify(storeUser?.role) !== JSON.stringify(profile.role)) {
        setAuth(updatedUser);
      }
    }
  }, [profile, isAuthenticated, setAuth, storeUser]);

  const user: User | null | undefined =
    profile && storeUser
      ? {
          ...storeUser,
          id: profile.id,
          email: profile.email,
          username:
            typeof profile.username === "string"
              ? profile.username
              : (storeUser?.username ?? undefined),
          isActive: profile.isActive ?? storeUser.isActive,
          isEmailVerified: profile.isEmailVerified ?? storeUser.isEmailVerified,
          role: profile.role ?? null,
        }
      : storeUser;

  return { user };
}
