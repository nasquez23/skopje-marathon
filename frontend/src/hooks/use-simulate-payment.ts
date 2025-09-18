import { useMutation, useQueryClient } from "@tanstack/react-query";
import { simulatePayment } from "../services/participants-api";
import type { PaymentSimulationRequest } from "../types/participant";

export function useSimulatePayment(participantId: string | null) {
  const qc = useQueryClient();
  return useMutation<"PENDING" | "PAID" | "FAILED", any, PaymentSimulationRequest>({
    mutationFn: (payload) => simulatePayment(participantId ?? "", payload),
    onSuccess: () => {
      // Invalidate queries that may be affected by payment status
      qc.invalidateQueries({ queryKey: ["participants"] });
      qc.invalidateQueries({ queryKey: ["participant-status"] });
    },
  });
}


