import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { components } from "@/types/api";
import type { User, UserRole } from "@/types";

type PermissionKey = components["schemas"]["Permission"];

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  setAuth: (user: User | null) => void;
  updateUser: (user: User) => void;
  logout: () => void;
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
  hasPermission: (permission: PermissionKey) => boolean;
  hasAnyPermission: (permissions: PermissionKey[]) => boolean;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      setAuth: (user) => {
        set({ user, isAuthenticated: true });
      },
      updateUser: (user) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...user } : user,
        }));
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      hasRole: (role) => {
        return get().user?.role?.name === role;
      },

      hasAnyRole: (roles) => {
        const userRole = get().user?.role?.name;
        return userRole !== undefined && roles.includes(userRole);
      },

      hasPermission: (permission) => {
        const permissions = get().user?.role?.permissions ?? [];
        return permissions.some((p) => `${p.resource}:${p.action}` === permission);
      },

      hasAnyPermission: (permissions) => {
        const userPermissions = get().user?.role?.permissions ?? [];
        return permissions.some((p) =>
          userPermissions.some((up) => `${up.resource}:${up.action}` === p),
        );
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
