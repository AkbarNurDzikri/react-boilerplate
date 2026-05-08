import type { LucideIcon } from 'lucide-react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export interface StatCard {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: {
    value: number
    label: string
  }
  iconClassName?: string
}

interface StatsCardsProps {
  stats: StatCard[]
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        const isPositive = (stat.trend?.value ?? 0) >= 0

        return (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div
                className={cn(
                  'flex size-10 items-center justify-center rounded-full',
                  stat.iconClassName ?? 'bg-primary/10',
                )}
              >
                <Icon className="size-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.trend && (
                <div className="mt-1 flex items-center gap-1 text-xs">
                  {isPositive ? (
                    <TrendingUp className="size-3 text-emerald-500" />
                  ) : (
                    <TrendingDown className="size-3 text-destructive" />
                  )}
                  <span
                    className={cn(
                      'font-medium',
                      isPositive ? 'text-emerald-500' : 'text-destructive',
                    )}
                  >
                    {isPositive ? '+' : ''}
                    {stat.trend.value}%
                  </span>
                  <span className="text-muted-foreground">{stat.trend.label}</span>
                </div>
              )}
              {stat.description && (
                <p className="mt-1 text-xs text-muted-foreground">{stat.description}</p>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
