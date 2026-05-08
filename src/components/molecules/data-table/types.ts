import { type ReactNode } from 'react'
import { type paths } from '@/types/api.d'
import { type ColumnDef } from '@tanstack/react-table'

export interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
  apiEndpoint: keyof paths
  queryKey: string[]
  title?: string
  description?: string
  createButton?: ReactNode
  searchPlaceholder?: string
  defaultPageSize?: number
}
