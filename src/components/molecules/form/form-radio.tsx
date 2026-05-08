import { type Control, type FieldValues, type Path } from 'react-hook-form'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import type { SelectOption } from '@/types'

interface FormRadioProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  options: SelectOption[]
  label?: string
  description?: string
  className?: string
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
}

export function FormRadio<TFieldValues extends FieldValues>({
  name,
  control,
  options,
  label,
  description,
  className,
  disabled = false,
  orientation = 'vertical',
}: FormRadioProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value as string}
              disabled={disabled}
              className={orientation === 'horizontal' ? 'flex gap-4' : 'flex flex-col gap-2'}
            >
              {options.map((option) => (
                <div key={option.value} className="flex items-center gap-2">
                  <RadioGroupItem value={option.value} id={`${name}-${option.value}`} />
                  <Label htmlFor={`${name}-${option.value}`} className="font-normal">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
