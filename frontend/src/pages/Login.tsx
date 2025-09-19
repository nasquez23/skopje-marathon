import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import PATHS from "../constants/paths";

export default function Login() {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login({ email, password });
      navigate(PATHS.HOME);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
      console.error("Login failed:", err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ my: 8 }}>
      <Paper elevation={5} sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" disabled={isLoading}>
            Sign in
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don’t have an account?{" "}
          <Button component={RouterLink} to={PATHS.REGISTER}>
            Create one
          </Button>
        </Typography>
      </Paper>
    </Container>
  );
}
