import { useQuery } from "@tanstack/react-query";
import { getParticipantStatus } from "../services/participants-api";
import type { ParticipantStatusResponse } from "../types/participant";

export function useParticipantStatus(searchValue: string) {
  return useQuery<ParticipantStatusResponse, unknown>({
    queryKey: ["participant-status", searchValue],
    queryFn: () => getParticipantStatus(searchValue),
    enabled: false,
    staleTime: 30_000,
  });
}


