import { format } from "date-fns";
import { id } from "date-fns/locale";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import type { AuditLog } from "@/types";
import { TIER_VARIANTS } from "../constants";

export function useAuditLogColumns(): ColumnDef<AuditLog>[] {
  const columns: ColumnDef<AuditLog>[] = [
    {
      accessorKey: "createdAt",
      header: "Waktu",
      cell: ({ row }) => {
        const date = new Date(row.getValue<string>("createdAt"));
        return (
          <span className="text-muted-foreground text-xs whitespace-nowrap">
            {format(date, "dd MMM yyyy, HH:mm", { locale: id })}
          </span>
        );
      },
    },
    {
      accessorKey: "action",
      header: "Aksi",
      cell: ({ row }) => {
        const action = row.getValue<string>("action");
        return (
          <Badge variant="outline" className="capitalize text-[10px]">
            {action.replace(/_/g, " ")}
          </Badge>
        );
      },
    },
    {
      accessorKey: "resource",
      header: "Resource",
      cell: ({ row }) => (
        <span className="font-medium text-sm">{row.getValue("resource")}</span>
      ),
    },
    {
      accessorKey: "resourceId",
      header: "Resource ID",
      cell: ({ row }) => (
        <span className="text-muted-foreground text-xs">
          {row.getValue("resourceId") || "-"}
        </span>
      ),
    },
    {
      accessorKey: "tier",
      header: "Severity",
      cell: ({ row }) => {
        const tier = row.getValue<string>("tier");
        const variant = TIER_VARIANTS[tier] ?? "default";
        return (
          <Badge variant={variant} className="text-[10px]">
            {tier}
          </Badge>
        );
      },
    },
    {
      accessorKey: "user",
      header: "User",
      cell: ({ row }) => {
        const user = row.getValue<{
          email: string | null;
          username: string | null;
        } | null>("user");
        if (!user)
          return <span className="text-muted-foreground text-xs">-</span>;
        return (
          <div className="text-xs">
            <div className="font-medium">
              {user.username || user.email || "-"}
            </div>
            {user.email && user.username && (
              <div className="text-muted-foreground">{user.email}</div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "userId",
      header: "User ID",
      cell: ({ row }) => (
        <span className="font-mono text-xs text-muted-foreground">
          {row.getValue("userId")
            ? (row.getValue("userId") as string).slice(0, 8) + "..."
            : "-"}
        </span>
      ),
    },
    {
      accessorKey: "ipAddress",
      header: "IP Address",
      cell: ({ row }) => (
        <span className="text-muted-foreground text-xs">
          {row.getValue("ipAddress") || "-"}
        </span>
      ),
    },
    {
      accessorKey: "userAgent",
      header: "User Agent",
      cell: ({ row }) => {
        const userAgent = row.getValue<string | null>("userAgent");
        if (!userAgent)
          return <span className="text-muted-foreground text-xs">-</span>;
        return (
          <span
            className="text-muted-foreground text-xs truncate max-w-xs"
            title={userAgent}
          >
            {userAgent}
          </span>
        );
      },
    },
    {
      accessorKey: "oldData",
      header: "Old Data",
      cell: ({ row }) => {
        const oldData = row.getValue<Record<string, never> | null>("oldData");
        if (!oldData || Object.keys(oldData).length === 0) {
          return <span className="text-muted-foreground text-xs">-</span>;
        }
        return (
          <span
            className="text-muted-foreground text-xs truncate max-w-xs cursor-help"
            title={JSON.stringify(oldData)}
          >
            {JSON.stringify(oldData).slice(0, 30)}...
          </span>
        );
      },
    },
    {
      accessorKey: "newData",
      header: "New Data",
      cell: ({ row }) => {
        const newData = row.getValue<Record<string, never> | null>("newData");
        if (!newData || Object.keys(newData).length === 0) {
          return <span className="text-muted-foreground text-xs">-</span>;
        }
        return (
          <span
            className="text-muted-foreground text-xs truncate max-w-xs cursor-help"
            title={JSON.stringify(newData)}
          >
            {JSON.stringify(newData).slice(0, 30)}...
          </span>
        );
      },
    },
  ];

  return columns;
}
