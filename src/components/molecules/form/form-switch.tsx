import { type Control, type FieldValues, type Path } from 'react-hook-form'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

interface FormSwitchProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label?: string
  description?: string
  className?: string
  disabled?: boolean
  inline?: boolean
}

export function FormSwitch<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  description,
  className,
  disabled = false,
  inline = false,
}: FormSwitchProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            inline
              ? 'flex items-center justify-between rounded-lg border p-4'
              : 'flex flex-col gap-1',
            className,
          )}
        >
          <div>
            {label && <FormLabel>{label}</FormLabel>}
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormControl>
            <Switch
              checked={field.value as boolean}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
