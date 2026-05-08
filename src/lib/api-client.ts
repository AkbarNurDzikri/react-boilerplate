import createClient from "openapi-fetch";
import { toast } from "react-toastify";
import type { paths } from "@/types/api.d";
import { useAuthStore } from "@/store/use-auth-store";

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const customFetch = async (
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> => {
  // Buat objek Request baru dari input dan init agar kita bisa memodifikasinya dengan aman
  // Ini memastikan method, body, dan headers dari openapi-fetch terangkut dengan benar
  // Token disimpan di httpOnly cookie, browser otomatis mengirimnya dengan credentials: 'include'
  const request = new Request(input, {
    ...init,
    credentials: "include",
  });

  let response = await fetch(request);

  // Jangan lakukan refresh jika request ini sendiri adalah login atau refresh
  const url = request.url;
  const isAuthPath =
    url.includes("/auth/login") || url.includes("/auth/refresh");

  if (response.status === 401 && !isAuthPath) {
    if (isRefreshing) {
      try {
        await new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });
        // Retry dengan credentials baru dari cookie
        response = await fetch(request);
      } catch (err) {
        return response;
      }
    } else {
      isRefreshing = true;

      try {
        const refreshRes = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (!refreshRes.ok) {
          throw new Error("Refresh failed");
        }

        processQueue(null, null);

        // Retry the original request dengan credentials baru
        response = await fetch(request);
      } catch (error) {
        processQueue(error, null);
        useAuthStore.getState().logout();
        if (!window.location.pathname.includes("/sign-in")) {
          window.location.href = "/sign-in";
        }
      } finally {
        isRefreshing = false;
      }
    }
  } else {
    // Tangani hanya server error (5xx) secara global
    // Error 4xx (401, 403, 404, dst) ditangani di masing-masing fitur
    if (response.status >= 500) {
      try {
        const errorData = await response.clone().json();
        toast.error(errorData.message || "Terjadi kesalahan pada server");
      } catch {
        toast.error("Terjadi kesalahan server. Silakan coba lagi.");
      }
    }
  }

  return response;
};

export const apiClient = createClient<paths>({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  fetch: customFetch,
});
