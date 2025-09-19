import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addRaceReview,
  getRaceDetails,
  listRaceReviews,
  listRaces,
} from "../services/races-api";
import type { AddReviewRequest } from "../types/race";

export function useRaces() {
  return useQuery({
    queryKey: ["races"],
    queryFn: () => listRaces(),
    staleTime: 60_000,
  });
}

export function useRaceDetails(id: string | null) {
  return useQuery({
    queryKey: ["race", id],
    queryFn: () => getRaceDetails(id ?? ""),
    enabled: !!id,
    staleTime: 60_000,
  });
}

export function useRaceReviews(
  id: string | null,
  page: number,
  size: number,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: ["race-reviews", id, page, size],
    queryFn: () => listRaceReviews(id ?? "", page, size),
    enabled: !!id || enabled,
  });
}

export function useAddRaceReview(id: string | null) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: AddReviewRequest) => addRaceReview(id ?? "", payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["race", id] });
      qc.invalidateQueries({ queryKey: ["race-reviews", id] });
    },
  });
}
