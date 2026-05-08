import { cn } from '@/lib/utils'
import type { ElementType, HTMLAttributes } from 'react'

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'lead' | 'large' | 'small' | 'muted'

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant
  as?: ElementType
}

const variantClasses: Record<TypographyVariant, string> = {
  h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
  h2: 'scroll-m-20 text-3xl font-semibold tracking-tight',
  h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
  h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
  p: 'leading-7',
  lead: 'text-xl text-muted-foreground',
  large: 'text-lg font-semibold',
  small: 'text-sm font-medium leading-none',
  muted: 'text-sm text-muted-foreground',
}

const variantElements: Record<TypographyVariant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  p: 'p',
  lead: 'p',
  large: 'div',
  small: 'small',
  muted: 'p',
}

export function Typography({ variant = 'p', as, className, children, ...props }: TypographyProps) {
  const Tag: ElementType = as ?? variantElements[variant]
  return (
    <Tag className={cn(variantClasses[variant], className)} {...(props as HTMLAttributes<HTMLElement>)}>
      {children}
    </Tag>
  )
}
