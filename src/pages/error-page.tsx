import { useState } from 'react'
import { Link } from 'react-router'
import { AlertTriangle, Home, RefreshCw, Copy, Check, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Typography } from '@/components/atoms/typography'

interface ErrorPageProps {
  error: Error
  errorId: string
  onReset: () => void
}

export function ErrorPage({ error, errorId, onReset }: ErrorPageProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const timestamp = new Date().toLocaleString('id-ID', {
    dateStyle: 'long',
    timeStyle: 'medium',
  })

  const handleCopyReport = async () => {
    const report = [
      `Error Report`,
      `ID       : ${errorId}`,
      `Waktu    : ${timestamp}`,
      `Pesan    : ${error.message}`,
      ``,
      `Stack Trace:`,
      error.stack ?? '(tidak tersedia)',
    ].join('\n')

    try {
      await navigator.clipboard.writeText(report)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard tidak tersedia, abaikan
    }
  }

  return (
    <div className="flex min-h-svh flex-col">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg space-y-8">

          {/* Status badges */}
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="destructive" className="px-3 py-1 text-sm">
              Terjadi Kesalahan
            </Badge>
            <Badge variant="secondary" className="px-3 py-1 font-mono text-xs tracking-wider">
              {errorId}
            </Badge>
          </div>

          {/* Icon area */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-3 rounded-full bg-destructive/10 blur-xl" aria-hidden="true" />
              <div className="relative rounded-2xl border border-destructive/20 bg-destructive/5 p-6">
                <AlertTriangle className="h-14 w-14 text-destructive" />
              </div>
            </div>
          </div>

          {/* Title & description */}
          <div className="space-y-3 text-center">
            <Typography variant="h2" className="text-2xl sm:text-3xl">
              Oops! Sesuatu Salah
            </Typography>
            <Typography variant="lead" className="text-base sm:text-lg">
              Aplikasi mengalami error yang tidak terduga. Tim kami telah diberitahu
              dan sedang menangani masalah ini.
            </Typography>
          </div>

          {/* Error meta info */}
          <div className="rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm">
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Error ID</span>
              <span className="font-mono font-medium text-foreground">{errorId}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Waktu</span>
              <span className="text-foreground">{timestamp}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex items-start justify-between gap-2">
              <span className="shrink-0 text-muted-foreground">Pesan</span>
              <span className="break-all text-right text-foreground">{error.message}</span>
            </div>
          </div>

          {/* Expandable technical details */}
          <div className="overflow-hidden rounded-lg border border-border">
            <button
              type="button"
              onClick={() => setIsDetailOpen(!isDetailOpen)}
              className="flex w-full cursor-pointer items-center justify-between px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50"
            >
              <span>Detail Teknis</span>
              {isDetailOpen
                ? <ChevronUp className="h-4 w-4" />
                : <ChevronDown className="h-4 w-4" />
              }
            </button>

            {isDetailOpen && (
              <div className="border-t border-border bg-muted/30 p-4">
                <pre className="overflow-x-auto whitespace-pre-wrap break-words font-mono text-xs text-muted-foreground">
                  {import.meta.env.DEV
                    ? (error.stack ?? error.message)
                    : error.message
                  }
                </pre>
              </div>
            )}
          </div>

          <Separator />

          {/* Action buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              variant="outline"
              onClick={onReset}
              className="cursor-pointer gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Coba Lagi
            </Button>
            <Button asChild className="cursor-pointer gap-2">
              <Link to="/dashboard">
                <Home className="h-4 w-4" />
                Ke Dashboard
              </Link>
            </Button>
            <Button
              variant="ghost"
              onClick={() => void handleCopyReport()}
              className="cursor-pointer gap-2"
            >
              {copied
                ? <><Check className="h-4 w-4 text-green-500" /> Tersalin!</>
                : <><Copy className="h-4 w-4" /> Salin Laporan</>
              }
            </Button>
          </div>

          {/* Support info */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <MessageCircle className="h-3.5 w-3.5 flex-shrink-0" />
            <span>
              Butuh bantuan?{' '}
              <a
                href="mailto:support@example.com"
                className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
              >
                Hubungi tim support
              </a>{' '}
              dan sertakan Error ID di atas.
            </span>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <footer className="border-t border-border px-4 py-4 text-center">
        <p className="text-xs text-muted-foreground">
          Jika masalah terus berlanjut, silakan hubungi tim support dengan menyertakan Error ID:{' '}
          <span className="font-mono font-medium text-foreground">{errorId}</span>
        </p>
      </footer>
    </div>
  )
}
