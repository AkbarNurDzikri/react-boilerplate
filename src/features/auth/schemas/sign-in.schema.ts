import { z } from "zod";

export const signInSchema = z.object({
  identifier: z.string().min(3, "Username atau email minimal 3 karakter"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export type SignInValues = z.infer<typeof signInSchema>;
