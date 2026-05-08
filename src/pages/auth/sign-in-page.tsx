import { SignInForm } from '@/features/auth/components/sign-in-form'
import { Typography } from '@/components/atoms/typography'
import { useAuthErrorFlash } from '@/features/auth/hooks/use-auth-error-flash'

export function SignInPage() {
  useAuthErrorFlash()

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Typography variant="h3">Masuk</Typography>
        <Typography variant="muted">Masukkan kredensial Anda untuk melanjutkan</Typography>
      </div>
      <SignInForm />
    </div>
  )
}
