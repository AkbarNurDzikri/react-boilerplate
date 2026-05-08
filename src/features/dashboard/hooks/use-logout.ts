import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { apiClient } from "@/lib/api-client";

export function useLogout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      await apiClient.POST("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      logout();
      queryClient.clear();
      toast.success("Berhasil keluar");
      void navigate("/sign-in");
    }
  };

  return { handleLogout };
}
