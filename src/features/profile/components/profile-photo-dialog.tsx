import Cropper, { type Area } from "react-easy-crop";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/atoms/typography";
import { useState, useCallback } from "react";

interface ProfilePhotoDialogProps {
  image: string;
  onSave: (croppedImage: string) => void;
  onCancel: () => void;
}

export function ProfilePhotoDialog({
  image,
  onSave,
  onCancel,
}: ProfilePhotoDialogProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback(
    (_extendedCroppedArea: Area, _croppedAreaPixels: Area) => {
      setCroppedAreaPixels(_croppedAreaPixels);
    },
    [],
  );

  return (
    <div className="space-y-4">
      <div className="relative h-[300px] w-full bg-muted rounded-md overflow-hidden">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className="space-y-2">
        <Typography variant="small">Zoom</Typography>
        <input
          type="range"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
        />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" onClick={onCancel}>
          Batal
        </Button>
        <Button 
          onClick={() => onSave("mock-cropped-image")} 
          className="gap-2"
        >
          <Check className="size-4" /> Simpan Foto
        </Button>
      </div>
    </div>
  );
}
