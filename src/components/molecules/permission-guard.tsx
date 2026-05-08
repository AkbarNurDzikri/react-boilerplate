import type { ReactNode } from 'react'
import { useAuthStore } from '@/store/use-auth-store'
import type { PermissionKey } from '@/types'

interface PermissionGuardProps {
  permission?: PermissionKey
  permissions?: PermissionKey[]
  requireAll?: boolean
  fallback?: ReactNode
  children: ReactNode
}

export function PermissionGuard({
  permission,
  permissions,
  requireAll = false,
  fallback = null,
  children,
}: PermissionGuardProps) {
  const hasPermission = useAuthStore((state) => state.hasPermission)
  const hasAnyPermission = useAuthStore((state) => state.hasAnyPermission)

  let allowed = true

  if (permission) {
    allowed = hasPermission(permission)
  } else if (permissions && permissions.length > 0) {
    allowed = requireAll
      ? permissions.every((p) => hasPermission(p))
      : hasAnyPermission(permissions)
  }

  return allowed ? <>{children}</> : <>{fallback}</>
}
