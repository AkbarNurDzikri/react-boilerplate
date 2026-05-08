import { useState, useEffect } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { PaginatedResponse } from "@/types";
import type { paths } from "@/types/api.d";
import type { DataTableProps } from "./types";

export function useDataTable<TData>({
  columns,
  apiEndpoint,
  queryKey,
  defaultPageSize = 10,
}: Omit<DataTableProps<TData>, "createButton" | "searchPlaceholder">) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [isDebouncing, setIsDebouncing] = useState(false);

  // Debounce search input
  useEffect(() => {
    if (searchInput === search) {
      setIsDebouncing(false);
      return;
    }

    setIsDebouncing(true);

    const handler = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
      setIsDebouncing(false);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchInput, search]);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [...queryKey, page, pageSize, search],
    queryFn: async () => {
      const { data, error } = await (apiClient.GET as unknown as (
        path: keyof paths,
        init: Record<string, unknown>
      ) => Promise<{ data: unknown; error: unknown }>)(apiEndpoint, {
        params: {
          query: {
            page: page.toString(),
            limit: pageSize.toString(),
            search: search || undefined,
          },
        },
      });
      if (error) throw error;
      return (data as unknown) as PaginatedResponse<TData>;
    },
    staleTime: 0, // Paksa untuk selalu memvalidasi data ke server
  });

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: data?.meta?.lastPage ?? -1,
  });

  const totalPages = data?.meta?.lastPage ?? 1;
  const totalData = data?.meta?.total;

  return {
    table,
    isLoading: isLoading || isFetching || isDebouncing, // Gabungkan semua state loading
    page,
    setPage,
    pageSize,
    setPageSize,
    searchInput,
    setSearchInput,
    totalPages,
    totalData,
  };
}
