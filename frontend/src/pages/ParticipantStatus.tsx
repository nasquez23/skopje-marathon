import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Alert, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PaymentModal from "../components/PaymentModal";
import { useState, type FormEvent } from "react";
import { useParticipantStatus } from "../hooks/use-participant-status";
import type { PaymentStatus } from "../types/participant";
import PaymentStatusChip from "../components/PaymentStatusChip";
import { getErrorMessage, getErrorSeverity } from "../utils/error-handler";

export default function ParticipantStatus() {
  const [searchValue, setSearchValue] = useState("");
  const [status, setStatus] = useState<PaymentStatus | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [participantId, setParticipantId] = useState<string | null>(null);
  const { refetch, isFetching, error, isError } =
    useParticipantStatus(searchValue);

  const [paymentOpen, setPaymentOpen] = useState(false);

  const onCheck = async (e: FormEvent) => {
    e.preventDefault();

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
    <Container
      maxWidth="md"
      sx={{ my: 8, minHeight: "40vh", width: "50%", mx: "auto" }}
    >
      <Paper elevation={5} sx={{ p: 5 }}>
        <form onSubmit={onCheck}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
            Check participant's status
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Email or Registration Number"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Enter email or registration number"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              helperText="Example: jane.doe@email.com or REG-1234ABCD"
            />
            <Button
              variant="contained"
              type="submit"
              disabled={!searchValue || isFetching}
            >
              {isFetching ? "Checking..." : "Check"}
            </Button>

            {isError && (
              <Alert severity={getErrorSeverity(error)}>
                {getErrorMessage(error)}
              </Alert>
            )}

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
              >
                {message}
              </Alert>
            )}
          </Stack>
        </form>

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
