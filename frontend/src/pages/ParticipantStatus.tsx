import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import PaymentModal from "../components/PaymentModal";
import { useState } from "react";
import { useParticipantStatus } from "../hooks/use-participant-status";

export default function ParticipantStatus() {
  const [searchValue, setSearchValue] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [participantId, setParticipantId] = useState<string | null>(null);
  const { refetch, isFetching } = useParticipantStatus(searchValue);

  const [paymentOpen, setPaymentOpen] = useState(false);

  const onCheck = async () => {
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
        `Not paid. Registration: ${d.registrationNumber ?? searchValue}`
      );
    }
  };

  return (
    <Container maxWidth="md" sx={{ my: 8, minHeight: "40vh" }}>
      <Paper variant="outlined" sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
          Check participant
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Email or Registration Number"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Enter email or registration number"
            fullWidth
          />
          <Button
            variant="contained"
            onClick={onCheck}
            disabled={!searchValue || isFetching}
          >
            Check
          </Button>
          {status && <Typography>Status: {status}</Typography>}
          {message && <Typography>{message}</Typography>}
        </Stack>

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
      </Paper>
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
    </Container>
  );
}
