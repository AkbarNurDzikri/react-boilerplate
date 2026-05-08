import { type Control, type FieldValues, type Path, Controller } from 'react-hook-form'
import type { HTMLInputTypeAttribute, ReactNode } from 'react'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface FormInputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label?: string
  placeholder?: string
  inputType?: HTMLInputTypeAttribute
  description?: string
  className?: string
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  prefix?: ReactNode
  suffix?: ReactNode
}

export function FormInput<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  inputType = 'text',
  description,
  className,
  disabled = false,
  onChange,
  prefix,
  suffix,
}: FormInputProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange: fieldOnChange, ...field } }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="relative flex items-center">
              {prefix && (
                <div className="absolute left-3 flex items-center justify-center text-muted-foreground">
                  {prefix}
                </div>
              )}
              <Input
                {...field}
                type={inputType}
                placeholder={placeholder}
                disabled={disabled}
                value={field.value as string ?? ''}
                className={cn(prefix && 'pl-10', suffix && 'pr-10')}
                onChange={(e) => {
                  onChange?.(e)
                  fieldOnChange(e)
                }}
              />
              {suffix && (
                <div className="absolute right-1 flex items-center justify-center">
                  {suffix}
                </div>
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

// Re-export Controller for cases where FormField is used outside FormProvider
export { Controller }
