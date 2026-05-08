import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/atoms/typography'

export function NotFoundPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 text-center px-4">
      <div className="space-y-2">
        <Typography variant="h1" className="text-8xl font-black text-muted-foreground/30">
          404
        </Typography>
        <Typography variant="h2">Halaman Tidak Ditemukan</Typography>
        <Typography variant="muted">
          Halaman yang Anda cari tidak ada atau telah dipindahkan.
        </Typography>
      </div>
      <Button asChild>
        <Link to="/dashboard">Kembali ke Dashboard</Link>
      </Button>
    </div>
  )
}
