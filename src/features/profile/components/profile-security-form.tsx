import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/molecules/form/form-input";
import { Typography } from "@/components/atoms/typography";
import { useChangePassword } from "../hooks/use-change-password";

export function ProfileSecurityForm() {
  const { form, onSubmit, isPending } = useChangePassword();

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <Typography variant="h4" className="mb-4">
        Ganti Password
      </Typography>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-md"
        >
          <FormInput
            name="oldPassword"
            control={form.control}
            label="Password Lama"
            placeholder="••••••••"
            inputType="password"
          />
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
          <Button type="submit" disabled={isPending}>
            {isPending ? "Mengubah..." : "Ubah Password"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
