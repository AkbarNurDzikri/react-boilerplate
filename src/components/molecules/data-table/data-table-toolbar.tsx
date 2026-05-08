import { type ReactNode } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface DataTableToolbarProps {
  searchInput: string
  onSearchChange: (value: string) => void
  searchPlaceholder?: string
  createButton?: ReactNode
}

export function DataTableToolbar({
  searchInput,
  onSearchChange,
  searchPlaceholder = 'Cari...',
  createButton,
}: DataTableToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 flex-1 max-w-sm relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder={searchPlaceholder}
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 h-9"
        />
      </div>
      {createButton && <div className="flex-shrink-0">{createButton}</div>}
    </div>
  )
}
