import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { apiClient } from "@/lib/api-client";
import { md5 } from "js-md5";
import type { User } from "@/types";

export function useProfile() {
  const { user: storeUser, isAuthenticated } = useAuth();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/auth/profile");
      if (error || !data) throw error ?? new Error("Profile data not found");
      return {
        ...data,
        username: typeof data.username === "string" ? data.username : null,
      } as User;
    },
    enabled: isAuthenticated,
  });

  const user = profile
    ? {
        ...storeUser,
        ...profile,
        username:
          typeof profile.username === "string"
            ? profile.username
            : storeUser?.username || "",
      }
    : storeUser;

  const username = typeof user?.username === "string" ? user.username : "";
  const initials = username
    ? username.slice(0, 2).toUpperCase()
    : user?.email?.slice(0, 2).toUpperCase() || "??";

  const avatarUrl = user?.email
    ? `https://www.gravatar.com/avatar/${md5(user.email.toLowerCase().trim())}?d=mp`
    : undefined;

  return { user, isLoading, initials, avatarUrl };
}
