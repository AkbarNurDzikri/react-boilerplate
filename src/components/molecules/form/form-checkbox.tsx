import { type Control, type FieldValues, type Path } from 'react-hook-form'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

interface FormCheckboxProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label?: string
  description?: string
  className?: string
  disabled?: boolean
}

export function FormCheckbox<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  description,
  className,
  disabled = false,
}: FormCheckboxProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('flex flex-row items-start gap-3', className)}>
          <FormControl>
            <Checkbox
              checked={field.value as boolean}
              onCheckedChange={field.onChange}
              disabled={disabled}
              className="mt-0.5"
            />
          </FormControl>
          {(label ?? description) && (
            <div className="space-y-1 leading-none">
              {label && <FormLabel>{label}</FormLabel>}
              {description && <FormDescription>{description}</FormDescription>}
            </div>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
