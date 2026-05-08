import { useEffect } from "react";
import { toast } from "react-toastify";

export function useAuthErrorFlash() {
  useEffect(() => {
    const error = sessionStorage.getItem("auth_error");
    if (error) {
      sessionStorage.removeItem("auth_error");
      toast.error(error);
    }
  }, []);
}
