import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Role } from "@/types";

interface RolePermissionsBadgeProps {
  permissions: Role["permissions"];
}

export function RolePermissionsBadge({
  permissions,
}: RolePermissionsBadgeProps) {
  const perms = permissions || [];

  // Grouping logic for the hover card
  const grouped = perms.reduce(
    (acc, p) => {
      if (typeof p === "string") return acc;
      const resource = p.resource;
      if (!acc[resource]) acc[resource] = [];
      acc[resource].push(p.action);
      return acc;
    },
    {} as Record<string, string[]>,
  );

  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>
        <div className="flex max-w-55 flex-wrap gap-1 cursor-help">
          {perms.slice(0, 3).map((p, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-[10px] px-1.5 py-0 capitalize whitespace-nowrap"
            >
              {typeof p === "string" ? p : `${p.resource}:${p.action}`}
            </Badge>
          ))}
          {perms.length > 3 && (
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0 border-dashed"
            >
              +{perms.length - 3} more
            </Badge>
          )}
          {perms.length === 0 && (
            <span className="text-[10px] text-muted-foreground italic">
              No permissions
            </span>
          )}
        </div>
      </HoverCardTrigger>
      {perms.length > 0 && (
        <HoverCardContent
          className="w-80 p-0 shadow-xl"
          side="right"
          align="start"
        >
          <div className="flex flex-col max-h-100">
            <div className="flex items-center justify-between border-b p-4 pb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Daftar Hak Akses
              </h4>
              <Badge
                variant="outline"
                className="text-[10px] bg-primary/5 text-primary border-primary/20"
              >
                {perms.length} Total
              </Badge>
            </div>

            <ScrollArea className="flex-1 overflow-y-auto">
              <div className="grid gap-4 p-4 pt-2">
                {Object.entries(grouped).map(([resource, actions]) => (
                  <div key={resource} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold capitalize text-primary">
                        {resource}
                      </span>
                      <Separator className="flex-1 opacity-50" />
                    </div>
                    <div className="flex flex-wrap gap-1.5 pl-2">
                      {actions.map((action) => (
                        <Badge
                          key={action}
                          variant="secondary"
                          className="text-[9px] px-1.5 py-0 capitalize bg-accent/50 hover:bg-accent border-transparent"
                        >
                          {action}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </HoverCardContent>
      )}
    </HoverCard>
  );
}
