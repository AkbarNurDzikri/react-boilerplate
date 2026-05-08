import { createElement } from "react";
import { toast } from "react-toastify";
import { useModalStore } from "@/store/use-modal-store";
import { ProfilePhotoDialog } from "../components/profile-photo-dialog";

export function useProfilePhoto() {
  const { openModal, closeModal } = useModalStore();

  const handleSavePhoto = (id: string) => {
    toast.info(
      "Fitur unggah foto belum didukung oleh server (sesuai kontrak API)",
    );
    closeModal(id);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const imageUrl = reader.result as string;
        
        const modalId = openModal({
          title: "Sesuaikan Foto Profil",
          size: "md",
          content: createElement(ProfilePhotoDialog, {
            image: imageUrl,
            onSave: () => handleSavePhoto(modalId),
            onCancel: () => closeModal(modalId),
          }),
        });
      });
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    toast.info("Fitur hapus foto belum didukung oleh server");
  };

  return {
    onFileChange,
    handleRemovePhoto,
  };
}
