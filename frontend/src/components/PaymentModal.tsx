import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import type { PaymentSimulationRequest } from "../types/participant";
import { useSimulatePayment } from "../hooks/use-simulate-payment";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  participantId: string;
  onSuccess?: () => void;
}

export default function PaymentModal({
  open,
  onClose,
  participantId,
  onSuccess,
}: PaymentModalProps) {
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expMonth, setExpMonth] = useState<string>("");
  const [expYear, setExpYear] = useState<string>("");
  const [cardHolder, setCardHolder] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState<boolean>(false);
  const payMutation = useSimulatePayment(participantId);

  const handlePay = async () => {
    if (!participantId) return;
    setMessage(null);
    try {
      const payload: PaymentSimulationRequest = {
        cardNumber,
        expMonth: parseInt(expMonth),
        expYear: parseInt(expYear),
        cardHolder,
        cvv,
      };

      const result = await payMutation.mutateAsync(payload);

      if (result === "PAID") {
        setMessage("Payment successful!");
        setIsPaymentSuccess(true);
        onSuccess?.();
        onClose();
      } else {
        setMessage("Payment failed. Please try again.");
        setIsPaymentSuccess(false);
      }
    } catch {
      setMessage("Payment failed. Please check your card details.");
      setIsPaymentSuccess(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Simulate Payment</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Demo cards: 4242424242424242 (valid), 4000000000000001 (invalid)
        </Typography>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="4242424242424242"
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              label="Exp Month"
              value={expMonth}
              onChange={(e) => setExpMonth(e.target.value)}
              placeholder="12"
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              label="Exp Year"
              value={expYear}
              onChange={(e) => setExpYear(e.target.value)}
              placeholder="2026"
            />
          </Grid>
          <Grid size={8}>
            <TextField
              fullWidth
              label="Card Holder"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              placeholder="John Doe"
            />
          </Grid>
          <Grid size={4}>
            <TextField
              fullWidth
              label="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="123"
            />
          </Grid>
        </Grid>
        {message && (
          <Typography sx={{ mt: 1, color: isPaymentSuccess ? "green" : "red" }}>
            {message}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handlePay}
          disabled={
            payMutation.status === "pending" ||
            !participantId ||
            isPaymentSuccess
          }
        >
          {isPaymentSuccess ? "Payment Successful" : "Pay"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
