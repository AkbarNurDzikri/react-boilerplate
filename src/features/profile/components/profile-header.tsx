import { Typography } from "@/components/atoms/typography";
import { FileUpload } from "@/components/molecules/file-upload";
import type { User } from "@/types";

interface ProfileHeaderProps {
  user: User | null | undefined;
  initials: string;
  avatarUrl?: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemovePhoto?: () => void;
}

export function ProfileHeader({ 
  user, 
  initials, 
  avatarUrl, 
  onFileChange,
  onRemovePhoto
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 bg-card p-8 rounded-2xl border shadow-sm">
      <FileUpload
        value={avatarUrl}
        initials={initials}
        onChange={onFileChange}
        onRemove={onRemovePhoto}
      />
      <div className="text-center md:text-left space-y-1">
        <Typography variant="h2" className="font-bold">
          {user?.username || "User"}
        </Typography>
        <Typography variant="muted" className="text-lg">
          {user?.email}
        </Typography>
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium capitalize">
          {user?.role?.name?.toLowerCase() || "User"}
        </div>
      </div>
    </div>
  );
}
