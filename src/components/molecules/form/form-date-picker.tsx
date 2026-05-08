import { useState } from 'react'
import { type Control, type FieldValues, type Path } from 'react-hook-form'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'

interface FormDatePickerProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label?: string
  placeholder?: string
  description?: string
  className?: string
  disabled?: boolean
  disabledDates?: (date: Date) => boolean
  fromDate?: Date
  toDate?: Date
}

export function FormDatePicker<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder = 'Pilih tanggal',
  description,
  className,
  disabled = false,
  disabledDates,
  fromDate,
  toDate,
}: FormDatePickerProps<TFieldValues>) {
  const [open, setOpen] = useState(false)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const rawValue: unknown = field.value
        const dateValue = rawValue instanceof Date ? rawValue : undefined
        return (
          <FormItem className={className}>
            {label && <FormLabel>{label}</FormLabel>}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    disabled={disabled}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !dateValue && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon className="mr-2 size-4" />
                    {dateValue
                      ? format(dateValue, 'dd MMMM yyyy', { locale: id })
                      : placeholder}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateValue}
                  onSelect={(date) => {
                    field.onChange(date)
                    setOpen(false)
                  }}
                  disabled={disabledDates}
                  fromDate={fromDate}
                  toDate={toDate}
                  initialFocus
                />
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
