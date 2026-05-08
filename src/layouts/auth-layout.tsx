import { Outlet, Navigate, useMatches } from "react-router";
import { useAuthStore } from "@/store/use-auth-store";
import { LottiePlayer } from "@/components/atoms/lottie-player";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/molecules/theme-toggle";

export type AuthLayoutHandle = {
  lottie?: unknown;
  formSide?: "left" | "right";
  panelTitle?: string;
  panelDescription?: string;
};

export function AuthLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const matches = useMatches();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handle = (matches[matches.length - 1]?.handle ??
    {}) as AuthLayoutHandle;
  const formSide = handle.formSide ?? "right";
  const lottieData = handle.lottie;
  const panelTitle =
    handle.panelTitle ?? "Kelola bisnis Anda dengan lebih cerdas";
  const panelDescription =
    handle.panelDescription ??
    "Platform manajemen terpadu untuk tim modern yang bergerak cepat dan efisien.";
  const appInitial = import.meta.env.VITE_APP_NAME.charAt(0).toUpperCase();

  const brandingPanel = (
    <div className="hidden lg:flex lg:w-[55%] relative flex-col overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950" />

      <div className="relative z-10 flex h-full flex-col px-12 py-4">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <Avatar className="rounded-full ring-2 ring-white/20">
            <AvatarFallback className="rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {appInitial}
            </AvatarFallback>
          </Avatar>
          <span className="text-lg font-semibold text-white">
            {import.meta.env.VITE_APP_NAME}
          </span>
        </div>

        {/* Lottie + heading */}
        <div className="my-auto flex flex-col items-center text-center">
          {lottieData !== undefined && (
            <LottiePlayer data={lottieData} className="w-full max-w-xs" />
          )}
          <h2 className="mt-2 text-3xl font-bold leading-tight text-white max-w-sm">
            {panelTitle}
          </h2>
          <p className="mt-0 text-base leading-relaxed text-slate-400 max-w-sm">
            {panelDescription}
          </p>
        </div>
      </div>
    </div>
  );

  const formPanel = (
    <div className="relative flex flex-1 flex-col items-center justify-center bg-background px-6 py-12 lg:px-16">
      {/* Dark mode toggle — top right of form panel */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      {/* Mobile logo — hidden on desktop */}
      <div className="mb-8 text-center lg:hidden">
        <div className="mb-1 flex items-center justify-center gap-2">
          <Avatar className="rounded-full ring-2 ring-white/20">
            <AvatarFallback className="rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {appInitial}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-bold">{import.meta.env.VITE_APP_NAME}</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Platform manajemen modern
        </p>
      </div>

      <div className="w-full max-w-sm">
        <Outlet />
      </div>
    </div>
  );

  return (
    <div className="flex min-h-svh">
      {formSide === "left" ? (
        <>
          {formPanel}
          {brandingPanel}
        </>
      ) : (
        <>
          {brandingPanel}
          {formPanel}
        </>
      )}
    </div>
  );
}
