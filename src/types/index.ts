import type { components } from './api'

export type ApiSchema = components['schemas']

export type PermissionKey = ApiSchema['Permission']

export type User = ApiSchema['UserResponse']
export type Role = Omit<ApiSchema['RoleResponse'], 'permissions'> & {
  permissions: { id: string; action: string; resource: string }[]
}
export type Permission = ApiSchema['PermissionResponse']
export type AuditLog = ApiSchema['AuditLogResponse']

export type UserRole = 'ADMIN' | 'USER' | string

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: User
}

export const USER_ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const

export type PaginatedResponse<T> = {
  data: T[]
  meta: ApiSchema['PaginationMetaDto']
}

export interface ApiError {
  success: boolean
  statusCode: number
  message: string
  error: string
  path: string
  timestamp: string
}

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface ComboboxOption {
  value: string
  label: string
}
