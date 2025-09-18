import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { listPaidParticipants } from "../services/participants-api";
import type { ParticipantResponse, Category, PageResponse } from "../types/participant";

export function useParticipants() {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [category, setCategory] = useState<Category | "">("");
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const { data, isLoading, error } = useQuery<PageResponse<ParticipantResponse>, unknown>({
    queryKey: ["participants", debouncedQuery, category, page, size],
    queryFn: () =>
      listPaidParticipants(debouncedQuery || undefined, category || undefined, page, size),
    staleTime: 60_000,
    placeholderData: (previousData) => previousData,
  });

  return {
    query,
    setQuery,
    category,
    setCategory,
    participants: data?.content ?? [],
    page: data?.number ?? page,
    size: data?.size ?? size,
    totalPages: data?.totalPages ?? 0,
    totalElements: data?.totalElements ?? 0,
    setPage,
    setSize,
    loading: isLoading,
    error:
      error && (error as any)?.response?.data?.message
        ? (error as any).response.data.message
        : error
        ? "Failed to fetch participants"
        : null,
  };
}
