import { useMutation } from "@tanstack/react-query";
import { registerParticipant } from "../services/participants-api";
import type {
  RegisterParticipantRequest,
  ParticipantResponse,
} from "../types/participant";

export function useRegisterParticipant() {
  return useMutation<ParticipantResponse, any, RegisterParticipantRequest>({
    mutationFn: (payload) => registerParticipant(payload),
  });
}
