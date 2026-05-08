import { Spinner } from "@/components/atoms/spinner";
import { useAuthCallback } from "../hooks/use-auth-callback";

export function AuthCallback() {
  useAuthCallback();

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-3">
      <Spinner size="lg" />
      <p className="text-sm text-muted-foreground">Memproses login...</p>
    </div>
  );
}
