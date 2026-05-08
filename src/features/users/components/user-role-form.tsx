import { Form } from "@/components/ui/form";
import { FormCombobox } from "@/components/molecules/form/form-combobox";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/atoms/spinner";
import type { User } from "@/types";
import { useUserRole } from "../hooks/use-user-role";

interface UserRoleFormProps {
  user: User;
  onSuccess: () => void;
}

export function UserRoleForm({ user, onSuccess }: UserRoleFormProps) {
  const { form, isPending, onSubmit, searchRoles } = useUserRole({
    user,
    onSuccess,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
        <FormCombobox
          control={form.control}
          name="roleId"
          label="Pilih Role"
          placeholder="Pilih role untuk pengguna ini"
          searchPlaceholder="Cari role..."
          disabled={isPending}
          options={
            user.role ? [{ label: user.role.name, value: user.role.id }] : []
          }
          searchAction={searchRoles}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button type="submit" disabled={isPending}>
            {isPending && <Spinner size="sm" className="mr-2" />}
            Simpan Perubahan
          </Button>
        </div>
      </form>
    </Form>
  );
}
