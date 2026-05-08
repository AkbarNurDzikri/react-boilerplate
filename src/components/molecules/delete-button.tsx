import { Trash2 } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useModalStore } from "@/store/use-modal-store";
import {
  useMutation,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Spinner } from "@/components/atoms/spinner";
import { cn } from "@/lib/utils";

interface DeleteButtonProps extends Omit<ButtonProps, "onClick"> {
  mutationFn: () => Promise<any>;
  queryKey?: QueryKey;
  targetDeletion?: string;
  onSuccess?: () => void;
}

export function DeleteButton({
  mutationFn,
  queryKey,
  targetDeletion,
  onSuccess,
  className,
  children,
  ...props
}: DeleteButtonProps) {
  const { openModal, closeModal } = useModalStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      toast.success(`Berhasil menghapus ${targetDeletion}`);
      if (queryKey) {
        void queryClient.invalidateQueries({ queryKey });
      }
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error?.message || `Gagal menghapus ${targetDeletion}`);
    },
  });

  const handleConfirm = async (modalId: string) => {
    try {
      await mutation.mutateAsync();
      closeModal(modalId);
    } catch {
      // Error handled in mutation
    }
  };

  const handleClick = () => {
    const id = openModal({
      title: "Konfirmasi Hapus",
      subTitle: (
        <span>
          Apakah Anda yakin ingin menghapus{" "}
          <span className="font-semibold text-destructive">
            {targetDeletion}
          </span>
          ? Tindakan ini tidak dapat dibatalkan
        </span>
      ),
      size: "sm",
      content: (
        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => closeModal(id)}
            disabled={mutation.isPending}
          >
            Batal
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleConfirm(id)}
            disabled={mutation.isPending}
          >
            {mutation.isPending && <Spinner size="sm" className="mr-2" />}
            Hapus
          </Button>
        </div>
      ),
    });
  };

  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      className={cn(
        "text-destructive hover:text-destructive focus:text-destructive hover:bg-destructive/10",
        className,
      )}
      disabled={mutation.isPending}
      {...props}
      onClick={handleClick}
    >
      <span className="flex items-center gap-2">
        {children || <Trash2 className="size-4" />}
      </span>
    </Button>
  );
}
