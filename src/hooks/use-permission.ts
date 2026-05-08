import type { UserRole } from '@/types'
import { useAuthStore } from '@/store/use-auth-store'

export function usePermission(requiredRoles: UserRole[]) {
  const hasAnyRole = useAuthStore((state) => state.hasAnyRole)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const hasPermission = isAuthenticated && hasAnyRole(requiredRoles)

  return { hasPermission }
}
