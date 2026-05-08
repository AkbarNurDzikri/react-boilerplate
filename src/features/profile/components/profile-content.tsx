import { User, Lock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProfile } from "../hooks/use-profile";
import { useProfilePhoto } from "../hooks/use-profile-photo";
import { ProfileHeader } from "./profile-header";
import { ProfileGeneralForm } from "./profile-general-form";
import { ProfileSecurityForm } from "./profile-security-form";
import { Spinner } from "@/components/atoms/spinner";

export function ProfileContent() {
  const { user, isLoading, initials, avatarUrl } = useProfile();
  const { onFileChange, handleRemovePhoto } = useProfilePhoto();

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 max-w-4xl space-y-8">
      <ProfileHeader
        user={user}
        initials={initials}
        avatarUrl={avatarUrl}
        onFileChange={onFileChange}
        onRemovePhoto={handleRemovePhoto}
      />

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="general" className="gap-2">
            <User className="size-4" /> Umum
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Lock className="size-4" /> Keamanan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <ProfileGeneralForm user={user} />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <ProfileSecurityForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
