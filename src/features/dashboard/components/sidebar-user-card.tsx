import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router";
import { useSidebarUser } from "@/features/dashboard/hooks/use-sidebar-user";
import type { User } from "@/types";

interface SidebarUserCardProps {
  user?: User | null;
  collapsed?: boolean;
}

export function SidebarUserCard({
  user,
  collapsed = false,
}: SidebarUserCardProps) {
  const { initials, avatarUrl, roleName, username, email } =
    useSidebarUser(user);

  if (collapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <div className="flex cursor-default justify-center py-1">
            <div className="relative">
              <Avatar className="size-8 ring-2 ring-primary/20 ring-offset-1 ring-offset-sidebar">
                <AvatarImage src={avatarUrl} alt={username} />
                <AvatarFallback className="text-xs font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 size-2 rounded-full border-2 border-sidebar bg-green-500" />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" className="space-y-0.5">
          <p className="font-semibold">{username}</p>
          <p className="text-xs opacity-70">{email}</p>
          <p className="text-xs capitalize opacity-70">
            {roleName.toLowerCase()}
          </p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-sidebar-foreground/10 bg-sidebar-accent/30 px-3 py-2 backdrop-blur-sm transition-colors hover:bg-sidebar-accent/50">
      <Link
        to="/profile"
        className="relative shrink-0 transition-opacity hover:opacity-80"
        title="Profil"
      >
        <Avatar className="size-10 ring-2 ring-primary/25 ring-offset-2 ring-offset-sidebar">
          <AvatarImage src={avatarUrl} alt={username} />
          <AvatarFallback className="text-sm font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-sidebar bg-green-500 shadow-sm" />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-0">
        <span
          className="truncate text-xs font-semibold text-sidebar-foreground"
          title={username}
        >
          {username}
        </span>
        <span
          className="truncate text-xs text-sidebar-foreground/55"
          title={email}
        >
          {email}
        </span>
        <Link to="/profile" className="hover:opacity-75" title="Profil">
          <Badge
            variant="outline"
            className="mt-0.5 h-4 w-fit border-sidebar-foreground/20 px-1.5 py-0 text-[10px] font-medium capitalize text-sidebar-foreground/65"
          >
            {roleName.toLowerCase()}
          </Badge>
        </Link>
      </div>
    </div>
  );
}
