import { useState } from "react";
import { Link } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FormInput } from "@/components/molecules/form/form-input";
import { Spinner } from "@/components/atoms/spinner";
import { GoogleAuthButton } from "@/features/auth/components/google-auth-button";
import { useSignUp } from "../hooks/use-sign-up";

export function SignUpForm() {
  const { isPending, form, onSubmit } = useSignUp();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          name="username"
          control={form.control}
          label="Username"
          placeholder="contoh: johndoe"
        />
        <FormInput
          name="email"
          control={form.control}
          label="Email"
          placeholder="contoh@email.com"
          inputType="email"
        />
        <FormInput
          name="password"
          control={form.control}
          label="Password"
          placeholder="Min. 8 karakter"
          inputType={showPassword ? "text" : "password"}
          suffix={
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="size-4 text-muted-foreground" />
              ) : (
                <Eye className="size-4 text-muted-foreground" />
              )}
            </Button>
          }
        />
        <FormInput
          name="confirmPassword"
          control={form.control}
          label="Konfirmasi Password"
          placeholder="Ulangi password"
          inputType={showConfirmPassword ? "text" : "password"}
          suffix={
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showConfirmPassword ? (
                <EyeOff className="size-4 text-muted-foreground" />
              ) : (
                <Eye className="size-4 text-muted-foreground" />
              )}
            </Button>
          }
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Spinner size="sm" className="mr-2" />}
          Daftar
        </Button>

        <div className="relative">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
            atau
          </span>
        </div>

        <GoogleAuthButton label="Daftar dengan Google" />

        <p className="text-center text-sm text-muted-foreground">
          Sudah punya akun?{" "}
          <Link to="/sign-in" className="text-primary hover:underline">
            Masuk sekarang
          </Link>
        </p>
      </form>
    </Form>
  );
}
