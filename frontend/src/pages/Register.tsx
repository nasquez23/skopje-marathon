import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import PATHS from "../constants/paths";
import { Alert } from "@mui/material";
import { getErrorSeverity } from "../utils/error-handler";

export default function Register() {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const form = e.currentTarget;
      const entries = Object.fromEntries(new FormData(form).entries());
      const firstName = String(entries.firstName ?? "");
      const lastName = String(entries.lastName ?? "");
      const email = String(entries.email ?? "");
      const password = String(entries.password ?? "");
      await register({ email, password, firstName, lastName });
      navigate(PATHS.HOME);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
      console.error("Registration failed:", err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ my: 8 }}>
      <Paper elevation={5} sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
          Create account
        </Typography>
        <Box component="form" onSubmit={onSubmit}>
          <Stack spacing={2}>
            <TextField
              label="First name"
              name="firstName"
              fullWidth
              autoComplete="given-name"
              required
            />
            <TextField
              label="Last name"
              name="lastName"
              fullWidth
              autoComplete="family-name"
              required
            />
            <TextField
              type="email"
              label="Email"
              name="email"
              fullWidth
              autoComplete="email"
              required
            />
            <TextField
              type="password"
              label="Password"
              name="password"
              fullWidth
              autoComplete="new-password"
              required
            />
            {error && (
              <Alert severity={getErrorSeverity(error)}>
                {error}
              </Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
            >
              Register
            </Button>
          </Stack>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Button component={RouterLink} to={PATHS.LOGIN}>
            Sign in
          </Button>
        </Typography>
      </Paper>
    </Container>
  );
}
