import { useLocation, useNavigate, Link } from 'react-router'
import { ArrowLeft, Home, SearchX, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Typography } from '@/components/atoms/typography'

export function NotFoundPage() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="flex min-h-svh flex-col">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg space-y-8 text-center">

          {/* Status badge */}
          <div className="flex justify-center">
            <Badge variant="secondary" className="px-3 py-1 text-sm font-mono tracking-widest">
              HTTP 404
            </Badge>
          </div>

          {/* Large 404 number */}
          <div className="relative select-none">
            <span
              className="block text-[10rem] font-black leading-none tracking-tighter text-primary/10 sm:text-[12rem]"
              aria-hidden="true"
            >
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-2xl border border-border/50 bg-background/80 p-4 shadow-sm backdrop-blur-sm">
                <SearchX className="h-12 w-12 text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Title & description */}
          <div className="space-y-3">
            <Typography variant="h2" className="text-2xl sm:text-3xl">
              Halaman Tidak Ditemukan
            </Typography>
            <Typography variant="lead" className="text-base sm:text-lg">
              Maaf, kami tidak dapat menemukan halaman yang Anda tuju.
              Halaman mungkin telah dipindahkan, dihapus, atau tidak pernah ada.
            </Typography>
          </div>

          {/* URL info */}
          <div className="rounded-lg border border-border bg-muted/50 px-4 py-3">
            <p className="text-xs text-muted-foreground">URL yang dicoba</p>
            <p className="mt-0.5 break-all font-mono text-sm text-foreground">
              {location.pathname}
            </p>
          </div>

          <Separator />

          {/* Action buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="cursor-pointer gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Button>
            <Button asChild className="cursor-pointer gap-2">
              <Link to="/dashboard">
                <Home className="h-4 w-4" />
                Ke Dashboard
              </Link>
            </Button>
          </div>

          {/* Support info */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <MessageCircle className="h-3.5 w-3.5 flex-shrink-0" />
            <span>
              Masalah berlanjut?{' '}
              <a
                href="mailto:support@example.com"
                className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
              >
                Hubungi tim support
              </a>
            </span>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <footer className="border-t border-border px-4 py-4 text-center">
        <p className="text-xs text-muted-foreground">
          {new Date().getFullYear()} &mdash; Kode status 404: Resource tidak ditemukan di server
        </p>
      </footer>
    </div>
  )
}
