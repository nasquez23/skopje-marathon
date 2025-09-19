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
  const [message, setMessage] = useState<string | null>(null);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState<boolean>(false);
  const payMutation = useSimulatePayment(participantId);

  const handlePay = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!participantId) return;
    setMessage(null);
    try {
      const form = e.currentTarget;
      const entries = Object.fromEntries(new FormData(form).entries());
      const payload: PaymentSimulationRequest = {
        cardNumber: String(entries.cardNumber ?? ""),
        expMonth: parseInt(String(entries.expMonth ?? "")),
        expYear: parseInt(String(entries.expYear ?? "")),
        cardHolder: String(entries.cardHolder ?? ""),
        cvv: String(entries.cvv ?? ""),
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
        <form onSubmit={handlePay} id="payment-form">
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Card Number"
                name="cardNumber"
                placeholder="4242424242424242"
                inputMode="numeric"
              />
            </Grid>
            <Grid size={6}>
              <TextField
                fullWidth
                label="Exp Month"
                name="expMonth"
                placeholder="12"
                inputMode="numeric"
              />
            </Grid>
            <Grid size={6}>
              <TextField
                fullWidth
                label="Exp Year"
                name="expYear"
                placeholder="2026"
                inputMode="numeric"
              />
            </Grid>
            <Grid size={8}>
              <TextField
                fullWidth
                label="Card Holder"
                name="cardHolder"
                placeholder="John Doe"
              />
            </Grid>
            <Grid size={4}>
              <TextField
                fullWidth
                label="CVV"
                name="cvv"
                placeholder="123"
                inputMode="numeric"
              />
            </Grid>
          </Grid>
          {message && (
            <Typography sx={{ mt: 1, color: isPaymentSuccess ? "green" : "red" }}>
              {message}
            </Typography>
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          type="submit"
          form="payment-form"
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
