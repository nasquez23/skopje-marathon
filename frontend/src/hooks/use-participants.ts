import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { listPaidParticipants } from "../services/participants-api";
import type { ParticipantResponse, Category } from "../types/participant";

export function useParticipants() {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [category, setCategory] = useState<Category | "">("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const { data, isLoading, error } = useQuery<ParticipantResponse[], unknown>({
    queryKey: ["participants", debouncedQuery, category],
    queryFn: () =>
      listPaidParticipants(debouncedQuery || undefined, category || undefined),
    staleTime: 60_000,
    placeholderData: (previousData) => previousData,
  });

  return {
    query,
    setQuery,
    category,
    setCategory,
    participants: data ?? [],
    loading: isLoading,
    error:
      error && (error as any)?.response?.data?.message
        ? (error as any).response.data.message
        : error
        ? "Failed to fetch participants"
        : null,
  };
}
