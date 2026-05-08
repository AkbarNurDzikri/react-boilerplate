import { useRef } from "react";
import { Camera, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface FileUploadProps {
  value?: string | null;
  initials?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove?: () => void;
  accept?: string;
  className?: string;
}

export function FileUpload({
  value,
  initials,
  onChange,
  onRemove,
  accept = "image/*",
  className,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <div 
        className="relative group cursor-pointer"
        onClick={handleClick}
      >
        <Avatar className="size-24 border-4 border-background shadow-xl transition-transform group-hover:scale-[1.02]">
          <AvatarImage
            src={value || undefined}
            alt="Profile"
            className="object-cover"
          />
          <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
            {initials || "??"}
          </AvatarFallback>
        </Avatar>

        {/* Camera Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 rounded-full transition-all duration-300">
          <Camera className="size-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          onChange={onChange}
        />
      </div>

      {/* Delete Button - Bottom Right */}
      {value && onRemove && (
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="absolute -bottom-1 -right-1 size-7 rounded-full shadow-lg hover:scale-110 transition-all border-2 border-background"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <Trash2 className="size-3.5" />
        </Button>
      )}
    </div>
  );
}
