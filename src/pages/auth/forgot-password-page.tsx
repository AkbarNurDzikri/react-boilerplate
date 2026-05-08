import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";
import { Typography } from "@/components/atoms/typography";

export function ForgotPasswordPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Typography variant="h3">Lupa Password?</Typography>
        <Typography variant="muted">
          Masukkan email Anda dan kami akan mengirimkan link reset password
        </Typography>
      </div>
      <ForgotPasswordForm />
    </div>
  );
}
