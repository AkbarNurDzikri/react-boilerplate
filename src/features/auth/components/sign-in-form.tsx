import { useState } from "react";
import { Link } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FormInput } from "@/components/molecules/form/form-input";
import { Spinner } from "@/components/atoms/spinner";
import { GoogleAuthButton } from "@/features/auth/components/google-auth-button";

import { useSignIn } from "../hooks/use-sign-in";

export function SignInForm() {
  const { isPending, form, onSubmit } = useSignIn();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          name="identifier"
          control={form.control}
          label="Username atau Email"
          placeholder="Masukkan username atau email"
        />
        <FormInput
          name="password"
          control={form.control}
          label="Password"
          placeholder="Masukkan password"
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

        <div className="text-right">
          <Link
            to="/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            Lupa password?
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Spinner size="sm" className="mr-2" />}
          Masuk
        </Button>

        <div className="relative">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
            atau
          </span>
        </div>

        <GoogleAuthButton label="Masuk dengan Google" />

        <p className="text-center text-sm text-muted-foreground">
          Belum punya akun?{" "}
          <Link to="/sign-up" className="text-primary hover:underline">
            Daftar sekarang
          </Link>
        </p>
      </form>
    </Form>
  );
}
