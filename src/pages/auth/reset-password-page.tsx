import { ResetPasswordForm } from '@/features/auth/components/reset-password-form'
import { Typography } from '@/components/atoms/typography'

export function ResetPasswordPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Typography variant="h3">Reset Password</Typography>
        <Typography variant="muted">Buat password baru untuk akun Anda</Typography>
      </div>
      <ResetPasswordForm />
    </div>
  )
}
