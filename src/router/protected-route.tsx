import { Navigate, Outlet } from 'react-router'
import type { components } from '@/types/api'
import { useAuthStore } from '@/store/use-auth-store'

type Permission = components['schemas']['Permission']

interface ProtectedRouteProps {
  requiredPermissions?: Permission[]
  redirectTo?: string
}

export function ProtectedRoute({
  requiredPermissions,
  redirectTo = '/sign-in',
}: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const hasAnyPermission = useAuthStore((state) => state.hasAnyPermission)

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  if (requiredPermissions && requiredPermissions.length > 0 && !hasAnyPermission(requiredPermissions)) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
