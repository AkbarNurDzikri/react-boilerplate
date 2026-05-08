import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/molecules/form/form-input";
import { Typography } from "@/components/atoms/typography";
import { useUpdateProfile } from "../hooks/use-update-profile";
import type { User } from "@/types";

interface ProfileGeneralFormProps {
  user: User | null | undefined;
}

export function ProfileGeneralForm({ user }: ProfileGeneralFormProps) {
  const { form, onSubmit, isPending } = useUpdateProfile(user);

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <Typography variant="h4" className="mb-4">
        Informasi Profil
      </Typography>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-md"
        >
          <FormInput
            name="username"
            control={form.control}
            label="Username"
            placeholder="Masukkan username baru"
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
