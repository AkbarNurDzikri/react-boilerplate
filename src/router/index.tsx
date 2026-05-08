import { createBrowserRouter, Navigate } from 'react-router'
import { authRoutes } from '@/features/auth/routes'
import { dashboardRoutes } from '@/features/dashboard/routes'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: 'auth/callback',
    lazy: async () => {
      const { AuthCallbackPage } = await import('@/pages/auth/auth-callback-page')
      return { Component: AuthCallbackPage }
    },
  },
  authRoutes,
  dashboardRoutes,
  {
    path: '*',
    lazy: async () => {
      const { NotFoundPage } = await import('@/pages/not-found-page')
      return { Component: NotFoundPage }
    },
  },
])
