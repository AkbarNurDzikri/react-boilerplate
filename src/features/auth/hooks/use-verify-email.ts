import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'react-router'
import { apiClient } from '@/lib/api-client'
import type { ApiSchema } from '@/types'

export type VerifyStatus = 'loading' | 'success' | 'error'

export function useVerifyEmail() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<VerifyStatus>('loading')
  const [message, setMessage] = useState('')
  const processed = useRef(false)

  const token = searchParams.get('token')

  useEffect(() => {
    if (processed.current) return
    processed.current = true

    if (!token) {
      setStatus('error')
      setMessage('Token verifikasi tidak ditemukan.')
      return
    }

    const verifyEmail = async () => {
      try {
        const { data, error } = await apiClient.GET('/auth/verify-email', {
          params: {
            query: { token },
          },
        })

        if (error) {
          setStatus('error')
          setMessage((error as { message?: string }).message || 'Gagal memverifikasi email.')
          return
        }

        setStatus('success')
        setMessage((data as ApiSchema['VerifyEmailResponse']).message || 'Email Anda telah berhasil diverifikasi.')
      } catch (err) {
        setStatus('error')
        setMessage('Terjadi kesalahan sistem. Silakan coba lagi nanti.')
      }
    }

    void verifyEmail()
  }, [token])

  return { status, message }
}
