import { Typography } from "@/components/atoms/typography";
import { DataTableToolbar } from "./data-table-toolbar";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableContent } from "./data-table-content";
import { useDataTable } from "./use-data-table";
import type { DataTableProps } from "./types";

export function DataTable<TData>({
  columns,
  apiEndpoint,
  queryKey,
  title,
  description,
  createButton,
  searchPlaceholder,
  defaultPageSize,
}: DataTableProps<TData>) {
  const {
    table,
    isLoading,
    page,
    setPage,
    pageSize,
    setPageSize,
    searchInput,
    setSearchInput,
    totalPages,
    totalData,
  } = useDataTable({ columns, apiEndpoint, queryKey, defaultPageSize });

  return (
    <div className="flex h-full flex-col gap-4">
      {(title || description) && (
        <div>
          {title && <Typography variant="h3">{title}</Typography>}
          {description && (
            <Typography variant="muted">{description}</Typography>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col gap-2 min-h-0">
        <DataTableToolbar
          searchInput={searchInput}
          onSearchChange={setSearchInput}
          searchPlaceholder={searchPlaceholder}
          createButton={createButton}
        />

        <div className="flex-1 min-h-0 overflow-auto rounded-md border">
          <DataTableContent
            table={table}
            isLoading={isLoading}
            pageSize={pageSize}
            columns={columns}
          />
        </div>

        <DataTablePagination
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
          totalData={totalData}
          isLoading={isLoading}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </div>
  );
}
