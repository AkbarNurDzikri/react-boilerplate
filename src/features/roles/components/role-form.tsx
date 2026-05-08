import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/molecules/form/form-input";
import { Spinner } from "@/components/atoms/spinner";
import { FormTextarea } from "@/components/molecules/form";
import type { Role } from "@/types";
import { useRoleForm } from "../hooks/use-role-form";

interface RoleFormProps {
  onSuccess?: () => void;
  initialData?: Role;
}

export function RoleForm({ onSuccess, initialData }: RoleFormProps) {
  const { form, onSubmit, isPending, isEdit } = useRoleForm({ onSuccess, initialData });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          name="name"
          control={form.control}
          label="Nama Role"
          placeholder="contoh: ADMINISTRATOR"
          onChange={(e) => {
            e.target.value = e.target.value.toUpperCase();
          }}
        />
        <FormTextarea
          name="description"
          control={form.control}
          label="Deskripsi (Opsional)"
          placeholder="Masukkan deskripsi role"
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button type="submit" disabled={isPending}>
            {isPending && <Spinner size="sm" className="mr-2" />}
            {isEdit ? "Perbarui Role" : "Simpan Role"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
