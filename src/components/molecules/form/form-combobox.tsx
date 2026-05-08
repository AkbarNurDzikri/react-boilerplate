import { useState, useEffect } from 'react'
import { type Control, type FieldValues, type Path } from 'react-hook-form'
import { Check, ChevronsUpDown, X } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { ComboboxOption } from '@/types'

interface FormComboboxProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  options?: ComboboxOption[]
  searchAction?: (query: string) => Promise<ComboboxOption[]>
  label?: string
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  description?: string
  className?: string
  disabled?: boolean
  multiple?: boolean
}

export function FormCombobox<TFieldValues extends FieldValues>({
  name,
  control,
  options = [],
  searchAction,
  label,
  placeholder = 'Pilih...',
  searchPlaceholder = 'Cari...',
  emptyMessage = 'Tidak ada hasil.',
  description,
  className,
  disabled = false,
  multiple = false,
}: FormComboboxProps<TFieldValues>) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [labelCache, setLabelCache] = useState<Record<string, string>>(() =>
    Object.fromEntries(options.map((opt) => [opt.value, opt.label])),
  )

  // Debounce: update debouncedQuery 300ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const { data: asyncOptions = [], isLoading } = useQuery({
    queryKey: ['combobox-search', name, debouncedQuery],
    queryFn: () => searchAction!(debouncedQuery),
    enabled: open && !!searchAction,
    staleTime: 1000 * 60 * 5,
  })

  const displayOptions = searchAction ? asyncOptions : options

  // Update label cache when options or asyncOptions change
  useEffect(() => {
    const allOptions = [...options, ...asyncOptions]
    if (!allOptions.length) return

    setLabelCache((prev) => {
      const next = { ...prev }
      let changed = false
      allOptions.forEach((opt) => {
        if (next[opt.value] !== opt.label) {
          next[opt.value] = opt.label
          changed = true
        }
      })
      return changed ? next : prev
    })
  }, [options, asyncOptions])

  const getLabel = (value: string) => labelCache[value] ?? value


  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const currentValue = field.value as string | string[] | undefined
        const valueArray = multiple
          ? (Array.isArray(currentValue) ? currentValue : [])
          : []
        const singleValue = !multiple ? (currentValue as string | undefined) : undefined

        const handleSelect = (selectedValue: string) => {
          if (multiple) {
            const current = valueArray
            const updated = current.includes(selectedValue)
              ? current.filter((v) => v !== selectedValue)
              : [...current, selectedValue]
            field.onChange(updated)
          } else {
            field.onChange(selectedValue === singleValue ? '' : selectedValue)
            setOpen(false)
          }
        }

        const removeItem = (val: string) => {
          field.onChange(valueArray.filter((v) => v !== val))
        }

        return (
          <FormItem className={className}>
            {label && <FormLabel>{label}</FormLabel>}
            <Popover open={open} onOpenChange={setOpen} modal={true}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    disabled={disabled}
                    className={cn(
                      'w-full justify-between font-normal',
                      !currentValue && 'text-muted-foreground',
                    )}
                  >
                    {multiple ? (
                      <span className="flex flex-wrap gap-1 truncate">
                        {valueArray.length > 0
                          ? valueArray.map((v) => (
                              <Badge
                                key={v}
                                variant="secondary"
                                className="gap-1"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  removeItem(v)
                                }}
                              >
                                {getLabel(v)}
                                <X className="size-3" />
                              </Badge>
                            ))
                          : placeholder}
                      </span>
                    ) : (
                      <span>{singleValue ? getLabel(singleValue) : placeholder}</span>
                    )}
                    <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent 
                className="w-[var(--radix-popover-trigger-width)] p-0 z-[9999]" 
                align="start"
                side="bottom"
                sideOffset={4}
              >
                <Command shouldFilter={false}>
                  <CommandInput
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                  />
                  <CommandList>
                    {isLoading ? (
                      <div className="py-6 text-center text-sm text-muted-foreground">
                        Memuat...
                      </div>
                    ) : (
                      <>
                        <CommandEmpty>{emptyMessage}</CommandEmpty>
                        <CommandGroup>
                          {displayOptions.map((option) => {
                            const isSelected = multiple
                              ? valueArray.includes(option.value)
                              : singleValue === option.value
                            return (
                              <CommandItem
                                key={option.value}
                                value={option.value}
                                onSelect={handleSelect}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 size-4',
                                    isSelected ? 'opacity-100' : 'opacity-0',
                                  )}
                                />
                                {option.label}
                              </CommandItem>
                            )
                          })}
                        </CommandGroup>
                      </>
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
