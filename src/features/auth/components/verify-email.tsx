import { useNavigate, Link } from 'react-router'
import { CheckCircle2, XCircle, Loader2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/atoms/typography'
import { useVerifyEmail } from '../hooks/use-verify-email'

export function VerifyEmail() {
  const navigate = useNavigate()
  const { status, message } = useVerifyEmail()

  return (
    <div className="flex flex-col items-center text-center py-4">
      {status === 'loading' && (
        <div className="space-y-4">
          <div className="relative flex items-center justify-center">
            <Loader2 className="size-12 animate-spin text-primary" />
          </div>
          <div className="space-y-1">
            <Typography variant="h4">Memverifikasi Email</Typography>
            <Typography variant="muted">Mohon tunggu sebentar, kami sedang memproses data Anda...</Typography>
          </div>
        </div>
      )}

      {status === 'success' && (
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-950/30">
              <CheckCircle2 className="size-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Typography variant="h4" className="text-emerald-600">Verifikasi Berhasil!</Typography>
            <Typography variant="muted">
              {message}
            </Typography>
          </div>
          <Button className="w-full gap-2" onClick={() => void navigate('/sign-in')}>
            Masuk ke Akun <ArrowRight className="size-4" />
          </Button>
        </div>
      )}

      {status === 'error' && (
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-destructive/10 p-3 text-destructive">
              <XCircle className="size-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Typography variant="h4" className="text-destructive">Verifikasi Gagal</Typography>
            <Typography variant="muted">
              {message}
            </Typography>
          </div>
          <div className="space-y-2 w-full">
            <Button variant="outline" className="w-full" onClick={() => window.location.reload()}>
              Coba Lagi
            </Button>
            <Link 
              to="/sign-in" 
              className="inline-block text-sm text-primary hover:underline"
            >
              Kembali ke Login
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
