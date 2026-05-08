import { SignUpForm } from '@/features/auth/components/sign-up-form'
import { Typography } from '@/components/atoms/typography'

export function SignUpPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Typography variant="h3">Daftar</Typography>
        <Typography variant="muted">Buat akun baru untuk memulai</Typography>
      </div>
      <SignUpForm />
    </div>
  )
}
