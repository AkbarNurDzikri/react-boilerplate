import { useSearchParams, Link } from "react-router";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/molecules/form/form-input";
import { Spinner } from "@/components/atoms/spinner";
import { useResetPassword } from "../hooks/use-reset-password";

export function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const { onSubmit, isPending, form } = useResetPassword(token);

  if (!token) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-sm text-destructive">
          Token tidak valid atau sudah kadaluarsa.
        </p>
        <Link
          to="/forgot-password"
          className="text-sm text-primary hover:underline"
        >
          Minta link reset baru
        </Link>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          name="newPassword"
          control={form.control}
          label="Password Baru"
          placeholder="Min. 8 karakter"
          inputType="password"
        />
        <FormInput
          name="confirmNewPassword"
          control={form.control}
          label="Konfirmasi Password Baru"
          placeholder="Ulangi password baru"
          inputType="password"
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Spinner size="sm" className="mr-2" />}
          Reset Password
        </Button>
      </form>
    </Form>
  );
}
