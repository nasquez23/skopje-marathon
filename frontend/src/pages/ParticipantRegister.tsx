import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { registerParticipant } from "../services/participants-api";
import type { Category } from "../types/participant";
import PaymentModal from "../components/PaymentModal";

export default function ParticipantRegister() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState<number>(18);
  const [category, setCategory] = useState<Category>("_5KM");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [participantId, setParticipantId] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    try {
      const res = await registerParticipant({
        firstName,
        lastName,
        email,
        age,
        category,
      });
      setResult(`Registration number: ${res.registrationNumber}`);
      setParticipantId(res.id);
      setPaymentOpen(true);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ my: 8 }}>
      <Paper variant="outlined" sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
          Register for the race
        </Typography>
        <form onSubmit={onSubmit}>
          <Stack spacing={2}>
            <TextField
              label="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <TextField
              label="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <TextField
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              type="number"
              label="Age"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              required
              inputProps={{ min: 16 }}
            />
            <TextField
              select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
            >
              <MenuItem value="_5KM">5 km</MenuItem>
              <MenuItem value="_10KM">10 km</MenuItem>
              <MenuItem value="HALF_MARATHON">Half Marathon</MenuItem>
              <MenuItem value="MARATHON">Marathon</MenuItem>
            </TextField>
            {result && <Typography color="success.main">{result}</Typography>}
            {error && <Typography color="error">{error}</Typography>}
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </form>
      </Paper>
      <PaymentModal
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        participantId={participantId ?? ""}
        onSuccess={() => setResult((prev) => (prev ? prev + " • Paid" : "Paid"))}
      />
    </Container>
  );
}
