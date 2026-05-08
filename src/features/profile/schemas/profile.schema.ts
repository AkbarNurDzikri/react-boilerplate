import { z } from 'zod'

export const updateProfileSchema = z.object({
  username: z.string().min(3, 'Username minimal 3 karakter').max(20, 'Username maksimal 20 karakter').optional(),
})

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(6, 'Password minimal 6 karakter'),
  newPassword: z.string().min(8, 'Password minimal 8 karakter'),
  confirmNewPassword: z.string().min(8, 'Konfirmasi password minimal 8 karakter'),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: 'Password baru tidak cocok',
  path: ['confirmNewPassword'],
})

export type UpdateProfileValues = z.infer<typeof updateProfileSchema>
export type ChangePasswordValues = z.infer<typeof changePasswordSchema>
