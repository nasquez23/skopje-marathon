import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useRegisterParticipant } from "../hooks/use-register-participant";
import type { Category } from "../types/participant";
import PaymentModal from "../components/PaymentModal";
import PageContainer from "../components/layout/PageContainer";
import FormCard from "../components/layout/FormCard";
import CategorySelect from "../components/forms/CategorySelect";

export default function ParticipantRegister() {
  const registerMutation = useRegisterParticipant();
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

    await registerMutation.mutateAsync(
      {
        firstName,
        lastName,
        email,
        age,
        category,
      },
      {
        onSuccess: (res) => {
          setResult(`Registration number: ${res.registrationNumber}`);
          setParticipantId(res.id);
          setPaymentOpen(true);
        },
        onError: (err) => {
          setError(err?.response?.data?.message || "Registration failed");
        },
      }
    );
  };

  return (
    <PageContainer maxWidth="sm">
      <FormCard title="Register for the race">
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
            <CategorySelect
              value={category}
              onChange={(cat) => setCategory(cat as Category)}
              includeAll={false}
              required
            />
            {result && <Typography color="success.main">{result}</Typography>}
            {error && <Typography color="error">{error}</Typography>}
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </form>
      </FormCard>
      <PaymentModal
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        participantId={participantId ?? ""}
        onSuccess={() =>
          setResult((prev) => (prev ? prev + " • Paid" : "Paid"))
        }
      />
    </PageContainer>
  );
}
