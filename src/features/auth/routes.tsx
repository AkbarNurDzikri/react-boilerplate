import { type RouteObject } from 'react-router'
import { AuthLayout } from '@/layouts/auth-layout'
import type { AuthLayoutHandle } from '@/layouts/auth-layout'

export const authRoutes: RouteObject = {
  element: <AuthLayout />,
  children: [
    {
      path: 'sign-in',
      lazy: async () => {
        const [{ SignInPage }, { default: lottie }] = await Promise.all([
          import('@/pages/auth/sign-in-page'),
          import('@/assets/lottie/Login.json'),
        ])
        return {
          Component: SignInPage,
          handle: {
            lottie,
            formSide: 'right',
            panelTitle: 'Selamat datang kembali',
            panelDescription: 'Masuk ke platform dan mulai kelola bisnis Anda hari ini.',
          } satisfies AuthLayoutHandle,
        }
      },
    },
    {
      path: 'sign-up',
      lazy: async () => {
        const [{ SignUpPage }, { default: lottie }] = await Promise.all([
          import('@/pages/auth/sign-up-page'),
          import('@/assets/lottie/Signup.json'),
        ])
        return {
          Component: SignUpPage,
          handle: {
            lottie,
            formSide: 'left',
            panelTitle: 'Bergabung bersama kami',
            panelDescription: 'Buat akun dan mulai perjalanan mengelola bisnis Anda secara profesional.',
          } satisfies AuthLayoutHandle,
        }
      },
    },
    {
      path: 'forgot-password',
      lazy: async () => {
        const [{ ForgotPasswordPage }, { default: lottie }] = await Promise.all([
          import('@/pages/auth/forgot-password-page'),
          import('@/assets/lottie/Forgot Password Animation.json'),
        ])
        return {
          Component: ForgotPasswordPage,
          handle: {
            lottie,
            formSide: 'right',
            panelTitle: 'Kami siap membantu',
            panelDescription: 'Jangan khawatir, kami akan membantu Anda mendapatkan kembali akses ke akun.',
          } satisfies AuthLayoutHandle,
        }
      },
    },
    {
      path: 'reset-password',
      lazy: async () => {
        const [{ ResetPasswordPage }, { default: lottie }] = await Promise.all([
          import('@/pages/auth/reset-password-page'),
          import('@/assets/lottie/Email verification.json'),
        ])
        return {
          Component: ResetPasswordPage,
          handle: {
            lottie,
            formSide: 'right',
            panelTitle: 'Atur ulang akses Anda',
            panelDescription: 'Buat password baru yang kuat untuk mengamankan akun Anda.',
          } satisfies AuthLayoutHandle,
        }
      },
    },
    {
      path: 'verify-email',
      lazy: async () => {
        const [{ VerifyEmailPage }, { default: lottie }] = await Promise.all([
          import('@/pages/auth/verify-email-page'),
          import('@/assets/lottie/Email verification.json'),
        ])
        return {
          Component: VerifyEmailPage,
          handle: {
            lottie,
            formSide: 'left',
            panelTitle: 'Hampir selesai!',
            panelDescription: 'Verifikasi email Anda untuk mulai menggunakan platform secara penuh.',
          } satisfies AuthLayoutHandle,
        }
      },
    },
  ],
}
