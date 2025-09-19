import { Alert, Button } from "@mui/material";
import PaymentModal from "../components/PaymentModal";
import { useState, type FormEvent } from "react";
import { useParticipantStatus } from "../hooks/use-participant-status";
import type { PaymentStatus } from "../types/participant";
import PaymentStatusChip from "../components/ui/PaymentStatusChip";
import PageContainer from "../components/layout/PageContainer";
import FormCard from "../components/layout/FormCard";
import StatusForm from "../components/forms/StatusForm";

export default function ParticipantStatus() {
  const [searchValue, setSearchValue] = useState("");
  const [status, setStatus] = useState<PaymentStatus | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [participantId, setParticipantId] = useState<string | null>(null);
  const { refetch, isFetching, error, isError } =
    useParticipantStatus(searchValue);

  const [paymentOpen, setPaymentOpen] = useState(false);

  const onCheck = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const entries = Object.fromEntries(new FormData(form).entries());
    const search = String(entries.search ?? "");
    if (!search) return;
    setSearchValue(search);

    setMessage(null);
    const res = await refetch();
    const d = res.data;

    if (!d) return;

    setStatus(d.status);
    setParticipantId(d.participantId);

    if (d.status === "PAID")
      setMessage(
        `Successful registration. Start number: ${d.startNumber ?? "assigned"}`
      );
    if (d.status === "PENDING" || d.status === "FAILED") {
      setMessage(
        `Not paid. Registration: ${d.registrationNumber ?? search}`
      );
    }
  };

  return (
    <PageContainer
      maxWidth="md"
      sx={{ minHeight: "40vh", width: "50%", mx: "auto" }}
    >
      <FormCard title="Check participant's status">
        <StatusForm
          onSubmit={onCheck}
          isSubmitting={isFetching}
          error={isError ? error : undefined}
        />

        {status && <PaymentStatusChip status={status} />}

        {message && (
          <Alert
            severity={
              status === "PAID"
                ? "success"
                : status === "FAILED"
                ? "error"
                : "info"
            }
            sx={{ mt: 2 }}
          >
            {message}
          </Alert>
        )}

        {status === "PENDING" || status === "FAILED" ? (
          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={() => setPaymentOpen(true)}
            disabled={!participantId}
          >
            Pay Now
          </Button>
        ) : null}
      </FormCard>
      <PaymentModal
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        participantId={participantId ?? ""}
        onSuccess={() => {
          setStatus("PAID");
          setMessage(
            "Payment successful! Your start number will be assigned shortly."
          );
        }}
      />
    </PageContainer>
  );
}
