import { type RouteObject } from 'react-router'
import { DashboardLayout } from '@/layouts/dashboard-layout'
import { ProtectedRoute } from '@/router/protected-route'

export const dashboardRoutes: RouteObject = {
  element: <ProtectedRoute />,
  children: [
    {
      element: <DashboardLayout />,
      children: [
        {
          path: 'dashboard',
          lazy: async () => {
            const { DashboardHomePage } = await import('@/pages/dashboard/dashboard-page')
            return { Component: DashboardHomePage }
          },
        },
        {
          path: 'profile',
          lazy: async () => {
            const { ProfilePage } = await import('@/pages/profile/profile-page')
            return { Component: ProfilePage }
          },
        },
        {
          path: 'users',
          element: <ProtectedRoute requiredPermissions={['user:read']} />,
          children: [
            {
              index: true,
              lazy: async () => {
                const { UsersPage } = await import('@/pages/users/users-page')
                return { Component: UsersPage }
              },
            },
          ],
        },
        {
          path: 'roles',
          element: <ProtectedRoute requiredPermissions={['role:read']} />,
          children: [
            {
              index: true,
              lazy: async () => {
                const { RolesPage } = await import('@/pages/roles/roles-page')
                return { Component: RolesPage }
              },
            },
          ],
        },
        {
          path: 'audit-logs',
          element: <ProtectedRoute requiredPermissions={['auditLog:read']} />,
          children: [
            {
              index: true,
              lazy: async () => {
                const { AuditLogsPage } = await import('@/pages/audit-logs/audit-logs-page')
                return { Component: AuditLogsPage }
              },
            },
          ],
        },
      ],
    },
  ],
}
