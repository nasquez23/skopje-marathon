import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import PaymentModal from "../components/PaymentModal";
import { useState } from "react";
import { getParticipantStatus } from "../services/participants-api";

export default function ParticipantStatus() {
  const [searchValue, setSearchValue] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [participantId, setParticipantId] = useState<string | null>(null);

  const [paymentOpen, setPaymentOpen] = useState(false);

  const onCheck = async () => {
    setMessage(null);
    const data = await getParticipantStatus(searchValue);
    console.log(data);
    setStatus(data.status);
    setParticipantId(data.participantId);
    if (data.status === "PAID")
      setMessage(
        `Successful registration. Start number: ${
          data.startNumber ?? "assigned"
        }`
      );
    if (data.status === "PENDING" || data.status === "FAILED") {
      setMessage(
        `Not paid. Registration: ${data.registrationNumber ?? searchValue}`
      );
    }
  };

  return (
    <Container maxWidth="md" sx={{ my: 8 }}>
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
          <Button variant="contained" onClick={onCheck}>
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
