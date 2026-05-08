import { Link } from "react-router";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/molecules/form/form-input";
import { Spinner } from "@/components/atoms/spinner";
import { useForgotPassword } from "../hooks/use-forgot-password";

export function ForgotPasswordForm() {
  const { onSubmit, form, isPending, isSuccess } = useForgotPassword();

  if (isSuccess) {
    return (
      <div className="space-y-4 text-center">
        <div className="rounded-lg bg-muted p-4">
          <p className="text-sm text-muted-foreground">
            Link reset password telah dikirim ke email Anda. Silakan cek inbox
            atau folder spam.
          </p>
        </div>
        <Link to="/sign-in" className="text-sm text-primary hover:underline">
          Kembali ke halaman masuk
        </Link>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          name="email"
          control={form.control}
          label="Email"
          placeholder="contoh@email.com"
          inputType="email"
          description="Kami akan mengirimkan link reset password ke email ini"
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Spinner size="sm" className="mr-2" />}
          Kirim Link Reset
        </Button>

        <p className="text-center text-sm">
          <Link to="/sign-in" className="text-primary hover:underline">
            Kembali ke halaman masuk
          </Link>
        </p>
      </form>
    </Form>
  );
}
