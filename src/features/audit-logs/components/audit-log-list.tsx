import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/molecules/data-table";
import type { AuditLog } from "@/types";
import { useAuditLogColumns } from "@/features/audit-logs/hooks/use-audit-log-columns";
import { AUDIT_LOGS_QUERY_KEY } from "@/features/audit-logs/constants";

export function AuditLogList() {
  const columns: ColumnDef<AuditLog>[] = useAuditLogColumns();

  return (
    <DataTable
      title="Audit Logs"
      description="Riwayat aktivitas sistem dan pengguna"
      columns={columns}
      apiEndpoint="/audit-logs"
      queryKey={AUDIT_LOGS_QUERY_KEY}
      searchPlaceholder="Cari log..."
    />
  );
}
