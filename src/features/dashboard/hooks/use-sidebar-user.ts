import { md5 } from "js-md5";
import type { User } from "@/types";

export function useSidebarUser(user?: User | null) {
  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : (user?.email?.slice(0, 2).toUpperCase() ?? "??");

  const avatarUrl = user?.email
    ? `https://www.gravatar.com/avatar/${md5(user.email.toLowerCase().trim())}?d=mp`
    : undefined;

  const roleName = user?.role?.name ?? "User";
  const username = user?.username ?? "Unknown";
  const email = user?.email ?? "";

  return { initials, avatarUrl, roleName, username, email };
}
