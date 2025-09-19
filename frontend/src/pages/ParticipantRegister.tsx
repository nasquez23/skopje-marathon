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
import { getErrorMessage, getErrorSeverity } from "../utils/error-handler";
import { Alert } from "@mui/material";
import CategorySelect from "../components/forms/CategorySelect";

export default function ParticipantRegister() {
  const registerMutation = useRegisterParticipant();
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [participantId, setParticipantId] = useState<string | null>(null);
  const [category, setCategory] = useState<Category>("_5KM");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const form = e.currentTarget;
    const entries = Object.fromEntries(new FormData(form).entries());
    const firstName = String(entries.firstName ?? "");
    const lastName = String(entries.lastName ?? "");
    const email = String(entries.email ?? "");
    const age = Number(entries.age);

    await registerMutation.mutateAsync(
      { firstName, lastName, email, age, category },
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
              name="firstName"
              autoComplete="given-name"
              required
            />
            <TextField
              label="Last name"
              name="lastName"
              autoComplete="family-name"
              required
            />
            <TextField
              type="email"
              label="Email"
              name="email"
              autoComplete="email"
              required
            />
            <TextField
              type="number"
              label="Age"
              name="age"
              required
              inputProps={{ min: 16 }}
            />
            <CategorySelect
              value={category as Category}
              onChange={(cat) => setCategory(cat as Category)}
              includeAll={false}
              required
            />
            {result && <Typography color="success.main">{result}</Typography>}
            {error && (
              <Alert severity={getErrorSeverity(error)}>
                {getErrorMessage(error)}
              </Alert>
            )}
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
