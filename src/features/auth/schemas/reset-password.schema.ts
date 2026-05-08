import { z } from "zod";
export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password minimal 8 karakter")
      .regex(/[A-Z]/, "Password harus mengandung huruf kapital")
      .regex(/[0-9]/, "Password harus mengandung angka"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Password tidak cocok",
    path: ["confirmNewPassword"],
  });

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
